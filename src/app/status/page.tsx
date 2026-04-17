import { PageShell } from '@/components/shared/page-shell'
import { Badge } from '@/components/ui/badge'

const services = [
  { name: 'Reading web app', detail: 'Articles, search, and account pages', status: 'Operational' },
  { name: 'Content API', detail: 'Feed + article delivery', status: 'Operational' },
  { name: 'Media delivery', detail: 'Hero imagery & cards', status: 'Operational' },
]

const incidents = [
  { date: 'Apr 2, 2026', title: 'Elevated latency on search', status: 'Resolved' },
  { date: 'Mar 18, 2026', title: 'Brief CDN cache mismatch on images', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      eyebrow="Operations"
      title="Platform status"
      description="Live snapshot of the services that keep the editorial experience online. We post incidents here when they affect reading or publishing."
    >
      <div className="space-y-10">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
            >
              <h2 className="text-base font-semibold text-slate-950">{service.name}</h2>
              <p className="mt-1 text-xs text-slate-500">{service.detail}</p>
              <Badge className="mt-4 rounded-full border-slate-200 bg-slate-100 text-slate-900">{service.status}</Badge>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-8">
          <h3 className="text-lg font-semibold text-slate-950">Recent incidents</h3>
          <p className="mt-2 text-sm text-slate-600">Short notes when something interrupted reading or uploads.</p>
          <div className="mt-6 space-y-3">
            {incidents.map((incident) => (
              <div key={incident.title} className="rounded-xl border border-slate-100 bg-slate-50/90 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{incident.date}</div>
                <div className="mt-1 text-sm font-medium text-slate-950">{incident.title}</div>
                <div className="mt-1 text-xs text-slate-600">{incident.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
