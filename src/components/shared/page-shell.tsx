'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  eyebrow,
  actions,
  children,
}: {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-950">
      <NavbarShell />
      <main>
        <section className="border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                {eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p>
                ) : null}
                <h1 className={`text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08] ${eyebrow ? 'mt-4' : ''}`}>
                  {title}
                </h1>
                {description ? (
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>
                ) : null}
              </div>
              {actions ? <div className="flex flex-shrink-0 flex-wrap gap-3">{actions}</div> : null}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
