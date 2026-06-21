import Link from 'next/link'
import { ArrowRight, BookOpen, PenLine, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const pillars = [
  {
    title: 'Long-form without noise',
    body: 'We design for essays, guides, and features with typography, spacing, and imagery that support reading instead of distracting from it.',
    icon: BookOpen,
  },
  {
    title: 'Clear structure across sections',
    body: 'From homepage to search to post pages, every surface follows a consistent rhythm so people can scan faster and read deeper.',
    icon: PenLine,
  },
  {
    title: 'Subtle motion, strong hierarchy',
    body: 'Motion stays restrained while contrast and spacing remain intentional, keeping the experience polished and calm.',
    icon: Sparkles,
  },
]

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title={`Inside ${SITE_CONFIG.name}`}
      description="A calm, modern publishing website with reading-first pages, structured navigation, and consistent visual rhythm across search, articles, and supporting sections."
      actions={
        <>
          <Button variant="outline" className="rounded-full border-slate-200 bg-white" asChild>
            <Link href="/articles">Browse articles</Link>
          </Button>
          <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800" asChild>
            <Link href="/contact">
              Contact us
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
            {SITE_CONFIG.name} is built for people who want clarity while browsing and reading: strong hierarchy, intentional spacing, and content surfaces that feel cohesive from homepage to detail pages.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            The same visual language continues across devices: simple navigation, clean content cards, and layouts that prioritize useful information over noisy chrome.
          </p>
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
    </PageShell>
  )
}
