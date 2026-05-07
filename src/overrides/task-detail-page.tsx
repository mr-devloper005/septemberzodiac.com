import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Globe, Mail, MapPin, Phone, Search, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskPostCard } from '@/components/shared/client-task-post-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ContentImage } from '@/components/shared/content-image'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { ArticleComments } from '@/components/tasks/article-comments'
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const EXPERIENCE = {
  headingFont: "'Cormorant Garamond', 'Georgia', serif",
  bodyFont: "'Manrope', 'Segoe UI', sans-serif",
}

type PostContent = {
  category?: string
  location?: string
  address?: string
  website?: string
  phone?: string
  email?: string
  description?: string
  body?: string
  highlights?: string[]
  logo?: string
  images?: string[]
  author?: string
}

const isValidImageUrl = (value?: string | null) => typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))
const getContent = (post: SitePost): PostContent => (post.content && typeof post.content === 'object' ? post.content : {}) as PostContent
const getImageUrls = (post: SitePost, content: PostContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images) ? content.images.filter((url): url is string => isValidImageUrl(url)) : []
  const merged = [...mediaImages, ...contentImages]
  if (merged.length) return merged
  if (isValidImageUrl(content.logo)) return [content.logo as string]
  return ['/placeholder.svg?height=900&width=1400']
}

function metaRows(content: PostContent, location?: string) {
  return [
    content.website ? { icon: Globe, label: content.website, href: content.website } : null,
    content.phone ? { icon: Phone, label: content.phone } : null,
    content.email ? { icon: Mail, label: content.email, href: `mailto:${content.email}` } : null,
    location ? { icon: MapPin, label: location } : null,
  ].filter(Boolean) as Array<{ icon: any; label: string; href?: string }>
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const taskConfig = getTaskConfig(task)
  const post = await fetchTaskPostBySlug(task, slug).catch(() => null)
  if (!post) notFound()

  const content = getContent(post)
  const images = getImageUrls(post, content)
  const location = content.address || content.location
  const description = content.description || post.summary || 'Details coming soon.'
  const articleHtml = formatRichHtml(content.body || description, 'Details coming soon.')
  const category = content.category || post.tags?.[0] || taskConfig?.label || task
  const related = (await fetchTaskPosts(task, 6)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const rows = metaRows(content, location)
  const isArticle = task === 'article'
  const isDirectory = task === 'listing' || task === 'classified' || task === 'profile'
  
  // Article-specific variables
  const postTags = Array.isArray(post.tags) ? post.tags.filter((tag) => typeof tag === 'string') : [];
  const articleAuthor = 
    (typeof content.author === 'string' && content.author.trim()) ||
    post.authorName ||
    'Editorial Team'

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #fbf6ef 0%, #ffffff 100%)", fontFamily: EXPERIENCE.bodyFont }}>
      <NavbarShell />
      <main className="mx-auto max-w-[92rem] px-4 py-8 sm:px-6 lg:px-8">
        <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black">
          <Search className="h-4 w-4" /> Back to {taskConfig?.label || task}
        </Link>
        <section className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="">
            <div className="overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(15,23,42,0.08)]" style={{ background: "#fffaf4", borderRadius: "32px" }}>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-black/60">
                  <Badge variant="secondary" className="inline-flex items-center gap-1" style={{ background: "#ead9bf", color: "#7652a2" }}>
                    <Tag className="h-3.5 w-3.5" /> {category}
                  </Badge>
                  {location ? <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {location}</span> : null}
                </div>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl" style={{ fontFamily: EXPERIENCE.headingFont, color: "#7652a2" }}>{post.title}</h1>
                {post.summary ? <p className="mt-4 max-w-3xl text-sm leading-8 text-black/70">{post.summary}</p> : null}
              </div>
              <div className="">
                <div className="relative aspect-[16/10] overflow-hidden" style={{ borderRadius: "32px" }}>
                  <ContentImage src={images[0]} alt={post.title} fill className="object-cover" intrinsicWidth={1600} intrinsicHeight={1000} />
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <RichContent html={articleHtml} className="max-w-none leading-8 prose-p:my-5 prose-headings:tracking-[-0.03em]" />
                {content.highlights?.length ? (
                  <div className="mt-8 rounded-[22px] border border-black/10 p-5" style={{ background: "#ead9bf" }}>
                    <p className="text-xs uppercase tracking-[0.24em] text-black/55">Highlights</p>
                    <ul className="mt-4 space-y-2 text-sm text-black/75">
                      {content.highlights.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            {isArticle ? (
              <div className="mt-6 border border-black/10 p-6" style={{ background: "#fffaf4", borderRadius: "32px" }}>
                <p className="mb-4 text-xs uppercase tracking-[0.28em] text-black/55">Conversation</p>
                <ArticleComments slug={post.slug} />
              </div>
            ) : null}
          </div>
          <aside className="">
            <div className="space-y-5 xl:sticky xl:top-24">
              <div className="border border-black/10 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]" style={{ background: "#fffaf4", borderRadius: "32px" }}>
                <p className="text-xs uppercase tracking-[0.24em] text-black/55">Detail panel</p>
                <div className="mt-4 space-y-4 text-sm text-black/70">
                  {isArticle ? (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-black mb-2">Title</h3>
                        <p className="text-black leading-relaxed">{post.title}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-black mb-2">Topics</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="inline-flex items-center gap-1" style={{ background: "#ead9bf", color: "#7652a2" }}>
                            <Tag className="h-3.5 w-3.5" />
                            {category}
                          </Badge>
                          {postTags.map((tag) => (
                            <Badge key={tag} variant="outline" className="border-black/20 text-black">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-black mb-2">Author</h3>
                        <p className="text-black">{articleAuthor}</p>
                      </div>
                    </>
                  ) : (
                    rows.map((row) => {
                      const Icon = row.icon
                      return row.href ? (
                        <a key={row.label} href={row.href} target="_blank" rel="noreferrer" className="flex items-start gap-3 break-all hover:text-black">
                          <Icon className="mt-0.5 h-4 w-4" /> <span>{row.label}</span>
                        </a>
                      ) : (
                        <div key={row.label} className="flex items-start gap-3">
                          <Icon className="mt-0.5 h-4 w-4" /> <span>{row.label}</span>
                        </div>
                      )
                    })
                  )}
                </div>
                {content.website ? <Button className="mt-5 w-full" asChild><a href={content.website} target="_blank" rel="noreferrer">Open source</a></Button> : null}
              </div>
              <div className="border border-black/10 p-5" style={{ background: "#ead9bf", borderRadius: "32px" }}>
                <p className="text-xs uppercase tracking-[0.24em] text-black/55">Read next</p>
                <div className="mt-4 flex gap-4 overflow-x-auto pb-2 xl:flex-col xl:overflow-visible">
                  {related.map((item) => (
                    <div key={item.id} className="min-w-[260px]">
                      <TaskPostCard post={item} href={buildPostUrl(task, item.slug)} taskKey={task} compact />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>
        {isDirectory ? (
          <section className="mt-8 border border-black/10 p-6" style={{ background: "#fffaf4", borderRadius: "32px" }}>
            <h2 className="text-2xl font-semibold" style={{ fontFamily: EXPERIENCE.headingFont, color: "#7652a2" }}>Contact snapshot</h2>
            <div className="mt-4 grid gap-4 text-sm text-black/70 md:grid-cols-2 xl:grid-cols-4">
              {rows.map((row) => {
                const Icon = row.icon
                return <div key={`snapshot-${row.label}`} className="rounded-[18px] border border-black/10 bg-white/70 p-4"><Icon className="mb-3 h-4 w-4" /><div>{row.label}</div></div>
              })}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
