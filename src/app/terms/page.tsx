import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Acceptable use',
    body: 'Treat other readers and writers with respect. No harassment, spam, or attempts to disrupt the service. Editorial content must not promote illegal activity.',
  },
  {
    title: 'Your content',
    body: 'You retain ownership of material you submit. You grant us a limited license to host, display, and promote that work across the publication surfaces.',
  },
  {
    title: 'Accounts',
    body: 'Keep credentials secure. We may suspend accounts that violate these terms or put the community at risk.',
  },
  {
    title: 'Disclaimers',
    body: 'Articles may include analysis and opinion. Nothing on the site constitutes professional, medical, or financial advice unless explicitly stated.',
  },
  {
    title: 'Changes',
    body: 'We may update these terms as the product evolves. Continued use after changes constitutes acceptance of the revised terms.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of service"
      description={`The agreement between you and ${SITE_CONFIG.name} when you read, contribute, or create an account.`}
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
