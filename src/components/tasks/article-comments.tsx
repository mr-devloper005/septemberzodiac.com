"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { loadFromStorage, saveToStorage, storageKeys } from "@/lib/local-storage";
import type { User } from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_MASTER_PANEL_URL ||
  process.env.NEXT_PUBLIC_MASTER_API_URL;
const SITE_CODE = process.env.NEXT_PUBLIC_SITE_CODE;
const LOCAL_COMMENT_VERSION = "v2";
const DAILY_COMMENT_LIMIT = 10;

type LocalComment = {
  id: string;
  slug: string;
  articleSlug: string;
  authorName: string;
  body: string;
  createdAt: string;
  source: "local";
};

type DisplayComment = {
  id: string;
  slug: string;
  authorName: string;
  body: string;
  createdAt: string;
  source: "local" | "remote";
};

const buildPublicUrl = (path: string) => {
  if (!API_BASE || !SITE_CODE) return null;
  return `${API_BASE.replace(/\/$/, "")}/api/v1/public/${SITE_CODE}${path}`;
};

const getContent = (post: SitePost) =>
  post.content && typeof post.content === "object" ? (post.content as Record<string, any>) : {};

const commentStorageKey = (slug: string) => `nexus-article-comments:${LOCAL_COMMENT_VERSION}:${slug}`;

const startOfToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

const nextResetTime = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

const getLocalAuthorName = () => {
  const savedUser = loadFromStorage<User | null>(storageKeys.user, null);
  return savedUser?.name?.trim() || "User";
};

const toDisplayComment = (comment: SitePost): DisplayComment => {
  const content = getContent(comment);
  return {
    id: comment.id,
    slug: comment.slug,
    authorName: comment.authorName || "Anonymous",
    body:
      (typeof content.description === "string" && content.description) ||
      comment.summary ||
      "Comment added.",
    createdAt: comment.publishedAt || comment.createdAt || new Date().toISOString(),
    source: "remote",
  };
};

const sortComments = (comments: DisplayComment[]) =>
  [...comments].sort((a, b) => {
    if (a.source !== b.source) {
      return a.source === "local" ? -1 : 1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

export function ArticleComments({ slug }: { slug: string }) {
  const [remoteComments, setRemoteComments] = useState<DisplayComment[]>([]);
  const [localComments, setLocalComments] = useState<LocalComment[]>([]);
  const [page, setPage] = useState(1);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [commentBody, setCommentBody] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const pageSize = 10;

  useEffect(() => {
    const saved = loadFromStorage<LocalComment[]>(commentStorageKey(slug), []);
    setLocalComments(Array.isArray(saved) ? saved : []);
  }, [slug]);

  useEffect(() => {
    const load = async () => {
      const target = buildPublicUrl("/feed?limit=200");
      if (!target) {
        setRemoteComments([]);
        return;
      }

      try {
        const response = await fetch(target, { cache: "no-store" });
        if (!response.ok) {
          setRemoteComments([]);
          return;
        }
        const json = (await response.json()) as { data?: { posts?: SitePost[] } };
        const posts = json.data?.posts || [];
        const filtered = posts.filter((post) => {
          const content = getContent(post);
          return (
            content.type === "comment" &&
            (content.articleSlug === slug ||
              (typeof content.parentUrl === "string" && content.parentUrl.includes(`/${slug}`)))
          );
        });

        setRemoteComments(filtered.map(toDisplayComment));
      } catch {
        setRemoteComments([]);
      }
    };

    load();
  }, [slug]);

  const mergedComments = useMemo(
    () =>
      sortComments([
        ...localComments.map((comment) => ({
          id: comment.id,
          slug: comment.slug,
          authorName: comment.authorName,
          body: comment.body,
          createdAt: comment.createdAt,
          source: "local" as const,
        })),
        ...remoteComments,
      ]),
    [localComments, remoteComments]
  );

  const commentsToday = useMemo(() => {
    const todayStart = startOfToday();
    return localComments.filter((comment) => new Date(comment.createdAt).getTime() >= todayStart).length;
  }, [localComments]);

  const remainingToday = Math.max(DAILY_COMMENT_LIMIT - commentsToday, 0);
  const limitReached = remainingToday <= 0;
  const resetLabel = nextResetTime().toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#comment-")) {
      const targetKey = hash.replace("#comment-", "");
      const match = mergedComments.find(
        (item) => item.id === targetKey || item.slug === targetKey
      );
      setHighlightId(match?.id || null);
      return;
    }

    if (hash === "#comment" && mergedComments.length) {
      setHighlightId(mergedComments[0].id);
      return;
    }

    setHighlightId(null);
  }, [mergedComments]);

  useEffect(() => {
    if (!highlightId) return;
    const target = document.getElementById(`comment-${highlightId}`);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [highlightId]);

  const totalPages = Math.max(Math.ceil(mergedComments.length / pageSize), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const visibleComments = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return mergedComments.slice(start, start + pageSize);
  }, [mergedComments, safePage]);

  const persistLocalComments = (nextComments: LocalComment[]) => {
    setLocalComments(nextComments);
    saveToStorage(commentStorageKey(slug), nextComments);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanBody = commentBody.trim();

    if (!cleanBody) {
      setFormError("Please write a comment before publishing.");
      return;
    }

    if (limitReached) {
      setFormError("You have reached the 10 comments per day limit on this device.");
      return;
    }

    const nextComment: LocalComment = {
      id: `local-${slug}-${Date.now()}`,
      slug: `local-comment-${Date.now()}`,
      articleSlug: slug,
      authorName: getLocalAuthorName(),
      body: cleanBody,
      createdAt: new Date().toISOString(),
      source: "local",
    };

    persistLocalComments([nextComment, ...localComments]);
    setCommentBody("");
    setFormError(null);
    setHighlightId(nextComment.id);
    setPage(1);
  };

  const handleDeleteLocalComment = (commentId: string) => {
    const nextComments = localComments.filter((comment) => comment.id !== commentId);
    persistLocalComments(nextComments);
    if (highlightId === commentId) {
      setHighlightId(null);
    }
    setFormError(null);
  };

  return (
    <section className="mt-16" id="comments">
      <div className="relative">
        <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-yellow-500 rounded-full"></div>
        <h2 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'Permanent Marker, cursive' }}>
          💬 Join the Conversation
        </h2>
        <p className="text-muted-foreground">Share your thoughts and connect with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-3xl blur opacity-20"></div>
        <div className="relative rounded-3xl border-2 border-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-white p-6 shadow-xl">
          <div className="space-y-3">
            <label htmlFor="comment-body" className="text-lg font-bold text-foreground" style={{ fontFamily: 'Permanent Marker, cursive' }}>
              ✍️ Write something amazing
            </label>
            <Textarea
              id="comment-body"
              value={commentBody}
              onChange={(event) => setCommentBody(event.target.value)}
              placeholder="What's on your mind? Share your ideas, questions, or feedback..."
              className="min-h-32 text-base border-2 focus:border-purple-500 rounded-2xl"
              maxLength={2000}
              disabled={limitReached}
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div
                className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${
                  limitReached
                    ? "bg-red-100 text-red-600"
                    : remainingToday <= 3
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {limitReached
                  ? `⚠️ Daily limit reached: ${DAILY_COMMENT_LIMIT}/${DAILY_COMMENT_LIMIT}`
                  : `🎯 ${remainingToday} of ${DAILY_COMMENT_LIMIT} comments remaining`}
              </div>
              <p className="text-xs text-muted-foreground">
                {limitReached
                  ? `🔄 Come back after ${resetLabel}`
                  : `⏰ Resets at ${resetLabel}`}
              </p>
            </div>
            <Button 
              type="submit" 
              disabled={limitReached}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white font-bold rounded-full px-8 py-3 text-base hover:shadow-lg transition-all hover:scale-105"
            >
              🚀 Post Comment
            </Button>
          </div>
          {formError ? <p className="mt-4 text-sm text-red-600 font-semibold">{formError}</p> : null}
        </div>
      </form>

      {mergedComments.length ? (
        <div className="mt-10 space-y-6">
          {visibleComments.map((comment, index) => {
            const isHighlighted = highlightId === comment.id;
            const colors = ['from-purple-500', 'from-pink-500', 'from-yellow-500', 'from-green-500', 'from-blue-500'];
            const gradientColor = colors[index % colors.length];
            return (
              <div
                key={comment.id}
                id={`comment-${comment.id}`}
                className={`relative group ${
                  isHighlighted ? "scale-105" : ""
                } transition-all duration-300`}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientColor} to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className={`relative rounded-3xl border-2 ${
                  isHighlighted ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
                } p-6 shadow-lg hover:shadow-xl transition-shadow`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${gradientColor} to-purple-500 flex items-center justify-center text-white font-bold text-lg`}>
                          {comment.authorName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground" style={{ fontFamily: 'Permanent Marker, cursive' }}>
                            {comment.authorName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <RichContent
                        html={formatRichHtml(comment.body, "Comment added.")}
                        className="text-base text-foreground leading-relaxed prose-p:my-2 prose-strong:text-purple-600"
                      />
                    </div>
                    {comment.source === "local" ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteLocalComment(comment.id)}
                        className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-200 text-red-500 transition hover:border-red-500 hover:bg-red-50"
                        aria-label="Delete local comment"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-3xl blur opacity-10"></div>
          <div className="relative rounded-3xl border-2 border-dashed border-gray-300 p-10 text-center bg-white">
            <div className="text-6xl mb-4">💭</div>
            <p className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'Permanent Marker, cursive' }}>
              No comments yet
            </p>
            <p className="text-muted-foreground">Be the first to share your thoughts!</p>
          </div>
        </div>
      )}

      {totalPages > 1 ? (
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm font-semibold text-muted-foreground">
            📖 Page {safePage} of {totalPages}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={safePage === 1}
              className="rounded-full border-2 border-gray-300 px-6 py-2 text-sm font-bold text-foreground disabled:cursor-not-allowed disabled:opacity-40 hover:border-purple-500 hover:text-purple-600 transition-colors"
            >
              ⬅️ Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={safePage === totalPages}
              className="rounded-full border-2 border-gray-300 px-6 py-2 text-sm font-bold text-foreground disabled:cursor-not-allowed disabled:opacity-40 hover:border-purple-500 hover:text-purple-600 transition-colors"
            >
              Next ➡️
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
