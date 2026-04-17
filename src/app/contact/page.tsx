import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#fafafa] text-slate-950',
      panel: 'border border-slate-200/90 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)]',
      soft: 'border border-slate-200/80 bg-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.04)]',
      muted: 'text-slate-600',
      action: 'bg-slate-900 text-white hover:bg-slate-800',
      field: 'border-slate-200 bg-slate-50/80 text-slate-900 placeholder:text-slate-400 focus-visible:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-900/10',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fafafa] text-slate-950',
      panel: 'border border-slate-200/90 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)]',
      soft: 'border border-slate-200/80 bg-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.04)]',
      muted: 'text-slate-600',
      action: 'bg-slate-900 text-white hover:bg-slate-800',
      field: 'border-slate-200 bg-slate-50/80 text-slate-900 placeholder:text-slate-400 focus-visible:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-900/10',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#0a1019] text-white',
      panel: 'border border-white/10 bg-white/[0.06] shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md',
      soft: 'border border-white/10 bg-white/[0.05]',
      muted: 'text-slate-300',
      action: 'bg-white text-slate-950 hover:bg-slate-100',
      field: 'border-white/15 bg-white/[0.06] text-white placeholder:text-slate-400 focus-visible:border-white/25 focus-visible:ring-2 focus-visible:ring-white/15',
    }
  }
  return {
    shell: 'bg-[#fafafa] text-slate-950',
    panel: 'border border-slate-200/90 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)]',
    soft: 'border border-slate-200/80 bg-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.04)]',
    muted: 'text-slate-600',
    action: 'bg-slate-900 text-white hover:bg-slate-800',
    field: 'border-slate-200 bg-slate-50/80 text-slate-900 placeholder:text-slate-400 focus-visible:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-900/10',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  const fieldBase = `h-12 w-full rounded-xl border px-4 text-sm outline-none transition ${tone.field}`
  const textAreaBase = `min-h-[180px] w-full rounded-2xl border px-4 py-3 text-sm leading-relaxed outline-none transition ${tone.field}`

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main>
        <section className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <p className="editorial-label w-fit border-slate-200/90 bg-white text-slate-700">
              Contact {SITE_CONFIG.name}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Reach the editorial desk—clear lanes, fast routing.
            </h1>
            <p className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${tone.muted}`}>
              Share what you&apos;re pitching, fixing, or collaborating on. We match your note to submissions, partnerships, or contributor support—without a generic ticket maze.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">How we help</p>
              <div className="mt-6 space-y-4">
                {lanes.map((lane) => (
                  <div
                    key={lane.title}
                    className={`hover-lift rounded-2xl p-6 transition ${tone.soft}`}
                  >
                    <lane.icon className={`h-5 w-5 ${productKind === 'visual' ? 'text-white' : 'text-slate-700'}`} />
                    <h2 className={`mt-4 text-xl font-semibold tracking-[-0.02em] ${productKind === 'visual' ? 'text-white' : 'text-slate-950'}`}>
                      {lane.title}
                    </h2>
                    <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl p-7 sm:p-8 ${tone.panel}`}>
              <h2
                className={`text-2xl font-semibold tracking-[-0.03em] ${productKind === 'visual' ? 'text-white' : 'text-slate-950'}`}
              >
                Send a message
              </h2>
              <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>
                We read every note and aim to reply within two business days.
              </p>
              <form className="mt-8 grid gap-4">
                <input className={fieldBase} placeholder="Your name" autoComplete="name" />
                <input className={fieldBase} type="email" placeholder="Email address" autoComplete="email" />
                <input className={fieldBase} placeholder="Subject or request type" />
                <textarea className={textAreaBase} placeholder="Share the full context so we can respond with the right next step." />
                <button
                  type="submit"
                  className={`inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition sm:w-auto ${tone.action}`}
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
