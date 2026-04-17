import { PageShell } from '@/components/shared/page-shell'

const licenses = [
  { name: 'Next.js', description: 'MIT License · App framework' },
  { name: 'React', description: 'MIT License · UI library' },
  { name: 'Tailwind CSS', description: 'MIT License · Styling system' },
  { name: 'Radix UI', description: 'MIT License · Accessible primitives' },
  { name: 'Lucide', description: 'ISC License · Iconography' },
]

export default function LicensesPage() {
  return (
    <PageShell
      eyebrow="Open source"
      title="Licenses & acknowledgements"
      description="We stand on excellent open-source work. Below are the core packages powering this reading experience."
    >
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {licenses.map((license) => (
            <div
              key={license.name}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
            >
              <h3 className="text-sm font-semibold text-slate-950">{license.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{license.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs leading-relaxed text-slate-500">
          Full license texts ship with their respective packages. Contact the desk if you need a complete attribution file for redistribution.
        </p>
      </div>
    </PageShell>
  )
}
