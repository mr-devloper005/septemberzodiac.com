import Link from 'next/link'
import { BookMarked, FileQuestion, LifeBuoy, Mail } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const guides = [
  {
    title: 'Reading & discovery',
    body: 'Learn how categories, search, and the homepage hero work together so you never lose the thread of an issue.',
    icon: BookMarked,
  },
  {
    title: 'Accounts & sessions',
    body: 'Understand how sign-in persists on your device and where to manage your profile details.',
    icon: FileQuestion,
  },
  {
    title: 'Publishing workflow',
    body: 'From draft to desk review—how contributors move stories through the editorial flow.',
    icon: LifeBuoy,
  },
]

export default function HelpPage() {
  return (
    <PageShell
      eyebrow="Help center"
      title="Answers for readers and contributors"
      description="Quick guides for navigating the archive, managing your account, and getting support when something looks off."
      actions={
        <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800" asChild>
          <Link href="/contact">
            <Mail className="mr-2 h-4 w-4" />
            Email support
          </Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="grid gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]"
            >
              <g.icon className="h-5 w-5 text-slate-700" aria-hidden />
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{g.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.body}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-8">
          <h3 className="text-lg font-semibold text-slate-950">Frequently asked</h3>
          <p className="mt-2 text-sm text-slate-600">Straight answers about reading, accounts, and publishing.</p>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {mockFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-slate-200/90">
                <AccordionTrigger className="text-left text-sm font-medium text-slate-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageShell>
  )
}
