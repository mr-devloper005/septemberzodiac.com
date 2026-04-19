import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: 'Essential cookies',
    body: 'Required for authentication, security, and basic navigation. These cannot be disabled without breaking sign-in.',
  },
  {
    title: 'Preference cookies',
    body: 'Remember theme choices, reading layout preferences, and lightweight UI state so the magazine rhythm stays consistent visit to visit.',
  },
  {
    title: 'Analytics cookies',
    body: 'Optional, aggregated insights into which sections readers open and how long pages remain in view—used only to improve editorial layout.',
  },
  {
    title: 'Managing cookies',
    body: 'Use your browser settings to block or clear cookies. Some features may degrade if essential cookies are removed.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie policy"
      description="Transparent detail about the small pieces of data we store to keep reading smooth and the desk informed."
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">Last updated · April 17, 2026</p>
        <div className="mt-8 space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-7"
            >
              <h3 className="text-base font-semibold text-slate-950">{section.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
