import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  { title: 'Senior Editor, Features', location: 'Remote (US/EU overlap)', type: 'Full-time', level: 'Senior' },
  { title: 'Product Designer, Reading', location: 'Remote', type: 'Full-time', level: 'Mid' },
  { title: 'Frontend Engineer, Editorial', location: 'Hybrid · New York', type: 'Full-time', level: 'Senior' },
]

const benefits = [
  'Editorial-first roadmap—you ship what readers feel on the page.',
  'Generous async culture with weekly writing room and design critiques.',
  'Learning stipend for conferences, books, and subscriptions.',
  'Healthcare, retirement match, and four weeks minimum PTO.',
]

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Build the calmest reading experience on the web"
      description={`Join ${SITE_CONFIG.name} as we refine typography, pacing, and photography for long-form publishing—without the noise of mixed-marketplace products.`}
      actions={
        <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800" asChild>
          <Link href="/contact">
            Introduce yourself
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-7"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full border-slate-200 bg-slate-100 text-slate-800">{role.level}</Badge>
                <Badge variant="outline" className="rounded-full border-slate-200 text-slate-700">
                  {role.type}
                </Badge>
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-slate-950">{role.title}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                {role.location}
              </p>
              <Button variant="outline" className="mt-5 rounded-full border-slate-200" asChild>
                <Link href="/contact">Discuss this role</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-8">
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">Why join {SITE_CONFIG.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            We are a small team obsessed with reader comfort: line length, scroll physics, and the micro-moments where a publication either feels premium or falls apart.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-slate-500">
            We welcome career-switchers and journalists who code. Send a short note, three links to work you are proud of, and how you like to collaborate.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
