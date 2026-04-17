import Link from 'next/link'
import { ArrowRight, BookOpen, PenLine, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

const stats = [
  { label: 'Reading-first layout', value: 'Editorial' },
  { label: 'Issue-style pacing', value: 'Calm' },
  { label: 'Desk workflow', value: 'Focused' },
]

const pillars = [
  {
    title: 'Long-form without noise',
    body: 'We design for essays, guides, and features—typography, spacing, and imagery that stay out of the way of the words.',
    icon: BookOpen,
  },
  {
    title: 'A single lane for stories',
    body: 'One clear archive, one calm rhythm. You open a headline, read deeply, and move on without marketplace clutter.',
    icon: PenLine,
  },
  {
    title: 'Quiet motion, strong hierarchy',
    body: 'Motion is subtle; contrast is intentional. The interface should feel like a magazine desk, not a dashboard.',
    icon: Sparkles,
  },
]

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About the publication"
      title={`Inside ${SITE_CONFIG.name}`}
      description="We are an article-led editorial surface: slower pacing, generous whitespace, and typography tuned for reading—built to feel like a finished magazine, not a generic template."
      actions={
        <>
          <Button variant="outline" className="rounded-full border-slate-200 bg-white" asChild>
            <Link href="/articles">Browse articles</Link>
          </Button>
          <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800" asChild>
            <Link href="/contact">
              Contact the desk
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-10">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Why this exists</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {SITE_CONFIG.name} exists for readers who want a calmer feed: fewer modules, clearer headlines, and photography that supports the story instead of competing with it. We treat every page as part of the same issue—from the cover hero to the legal footnotes.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Whether you are browsing on a phone or a wide desktop, the rhythm stays consistent: white fields, soft dividers, and charcoal type that keeps contrast high without feeling cold.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-200/80 bg-slate-50/90 px-4 py-4 text-center">
                <p className="text-lg font-semibold text-slate-950">{s.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]"
            >
              <p.icon className="h-5 w-5 text-slate-700" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-slate-950">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Editorial & product</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">People behind the desk</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">A small cross-functional group—editorial, design, and engineering—shipping the same quiet-luxury system you see across the site.</p>
          </div>
          <Button variant="ghost" className="self-start rounded-full text-slate-900 hover:bg-slate-100" asChild>
            <Link href="/careers">Open roles</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 transition hover:border-slate-300 hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-slate-200">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
              <p className="mt-3 text-xs text-slate-500">{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
