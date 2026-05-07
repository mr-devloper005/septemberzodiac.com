import Link from 'next/link'
import { Search, Sparkles } from 'lucide-react'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'
import { TaskPostCard } from '@/components/shared/task-post-card'

export const revalidate = 3

const EXPERIENCE = {
  headingFont: "'Cormorant Garamond', 'Georgia', serif",
  bodyFont: "'Manrope', 'Segoe UI', sans-serif",
}

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined
  )
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key))
  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as any).type)
    if (typeText === 'comment') return false
    const description = compactText((content as any).description)
    const body = compactText((content as any).body)
    const excerpt = compactText((content as any).excerpt)
    const categoryText = compactText((content as any).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return matchText(compactText(post.title || ''), normalized) || matchText(compactText(post.summary || ''), normalized) || matchText(description, normalized) || matchText(body, normalized) || matchText(excerpt, normalized) || matchText(tagsText, normalized)
  })
  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #fbf6ef 0%, #ffffff 100%)", fontFamily: EXPERIENCE.bodyFont }}>
      <main className="mx-auto max-w-[94rem] px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(15,23,42,0.08)]" style={{ background: "#fffaf4", borderRadius: "32px" }}>
          <div className="p-8 sm:p-10">
            
            <div className="">
              <div className="">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ background: "#ead9bf", color: "#7652a2" }}>
                  <Sparkles className="h-3.5 w-3.5" /> Search mode
                </div>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl" style={{ fontFamily: EXPERIENCE.headingFont, color: "#7652a2" }}>
                  {query ? `Results for "${query}"` : 'Search the full content field'}
                </h1>
                <p className="mt-4 text-sm leading-8" style={{ color: "#4b5563" }}>
                  Each site gets its own search rhythm too, so this page no longer feels like the same utility pasted everywhere.
                </p>
              </div>
              <form action="/search" className="mt-6 grid gap-3 md:grid-cols-[1fr_180px_180px_auto]">
                <input type="hidden" name="master" value="1" />
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45" />
                  <input name="q" defaultValue={query} placeholder="Search titles, summaries, and tags" className="h-12 w-full border border-black/10 bg-white pl-10 pr-4 text-sm outline-none" style={{ borderRadius: "32px" }} />
                </div>
                <input name="category" defaultValue={category} placeholder="Category" className="h-12 border border-black/10 bg-white px-4 text-sm outline-none" style={{ borderRadius: "32px" }} />
                <input name="task" defaultValue={task} placeholder="Task type" className="h-12 border border-black/10 bg-white px-4 text-sm outline-none" style={{ borderRadius: "32px" }} />
                <button type="submit" className="h-12 px-5 text-sm font-semibold" style={{ borderRadius: "32px", background: "#7652a2", color: "#fff" }}>Search</button>
              </form>
            </div>
          </div>
        </section>
        <section className="mt-8">
          {results.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              
              <div className="contents">
                {results.map((post) => {
                  const taskKey = getPostTaskKey(post)
                  const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`
                  return <TaskPostCard key={post.id} post={post} href={href} taskKey={taskKey || undefined} />
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-black/15 p-10 text-center text-sm text-black/60" style={{ background: "#fffaf4" }}>
              No matching posts yet.
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
