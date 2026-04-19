import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: 'What we collect',
    body: 'Account details you provide (name, email), reading preferences stored locally on your device, and basic technical logs needed to keep the site fast and secure.',
  },
  {
    title: 'How we use information',
    body: 'To personalize your reading experience, respond to support requests, improve typography and layout performance, and protect the community from abuse.',
  },
  {
    title: 'Cookies & storage',
    body: 'We use strictly necessary cookies for sessions plus optional analytics to understand which sections readers spend time in. You can clear local storage anytime from your browser.',
  },
  {
    title: 'Your choices',
    body: 'Update profile details from your account page, opt out of non-essential communications, or request deletion of your account and associated drafts.',
  },
  {
    title: 'Contact',
    body: 'Questions about this policy can be sent through the contact form—we respond within two business days where possible.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy"
      description="How we handle personal information for readers and contributors on this editorial site."
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
