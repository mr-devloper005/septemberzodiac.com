import Link from 'next/link'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

const EXPERIENCE = {
  headingFont: "'Cormorant Garamond', 'Georgia', serif",
  bodyFont: "'Manrope', 'Segoe UI', sans-serif",
}

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #fbf6ef 0%, #ffffff 100%)", fontFamily: EXPERIENCE.bodyFont }}>
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 overflow-hidden border border-white/40 shadow-[0_20px_60px_rgba(15,23,42,0.08)]" style={{ background: "#fffaf4", borderRadius: "32px", color: "#111827" }}>
          <div className="grid gap-6 p-6 sm:p-8">
            
            <div className="">
              <div className="">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ background: "#ead9bf", color: "#7652a2" }}>
                  <Sparkles className="h-3.5 w-3.5" /> Celestial Almanac
                </div>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl" style={{ fontFamily: EXPERIENCE.headingFont, color: "#7652a2" }}>
                  {taskConfig?.description || `Explore ${taskConfig?.label || task}`}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-8" style={{ color: "#4b5563" }}>
                  This task page is intentionally rebuilt around a orbital structure so it feels distinct from the rest of the network in spacing, hierarchy, filtering rhythm, and browsing behavior.
                </p>
              </div>

              <div className="mt-6">
                <form action={taskConfig?.route || '#'} className="grid gap-3 rounded-[20px] border border-black/10 bg-white/70 p-5">
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45" />
                      <input name="q" placeholder={`Search ${taskConfig?.label || task.toString()} ideas`} className="h-12 w-full border border-black/10 bg-white pl-10 pr-4 text-sm outline-none" style={{ borderRadius: "32px" }} />
                    </div>
                    <select name="category" defaultValue={normalizedCategory} className="h-12 border border-black/10 bg-white px-4 text-sm outline-none" style={{ borderRadius: "32px" }}>
                      <option value="all">All categories</option>
                      {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                    </select>
                    <button type="submit" className="h-12 px-5 text-sm font-semibold" style={{ borderRadius: "32px", background: "#7652a2", color: "#fff" }}>
                      Apply view
                    </button>
                  </div>
                </form>
                
              </div>
            </div>
          </div>
        </section>
        <section className="">
          
          <div><TaskListClient task={task} initialPosts={posts} category={normalizedCategory} /></div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
