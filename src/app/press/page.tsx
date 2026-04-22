'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      eyebrow="Press room"
      title="Brand assets & coverage"
      description="Download the logo lockup, product captures, and short editorial boilerplate for newsrooms and partners."
    >
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-8">
          <h2 className="text-lg font-semibold text-slate-950">Press kit downloads</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Vector and raster marks, UI screenshots, and tone guidelines aligned with the on-site reading experience.
          </p>
          <div className="mt-6 grid gap-3">
            {mockPressAssets.map((asset) => (
              <div
                key={asset.id}
                className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-4 transition hover:border-slate-300 hover:bg-white"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{asset.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{asset.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full border-slate-200 bg-white text-slate-800">{asset.fileType}</Badge>
                    <Button size="sm" variant="outline" className="rounded-full border-slate-200" onClick={() => setActiveAssetId(asset.id)}>
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                      onClick={() =>
                        toast({
                          title: 'Download started',
                          description: `${asset.title} is downloading.`,
                        })
                      }
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-7">
            <h3 className="text-lg font-semibold text-slate-950">Boilerplate</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We publish long-form articles with a quiet-luxury visual system—white fields, charcoal typography, and restrained motion—so readers can focus on the story.
            </p>
          </div>
          {mockPressCoverage.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.outlet}</div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-950">{item.headline}</p>
              <p className="mt-2 text-xs text-slate-500">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-slate-950">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-slate-600">{activeAsset?.description}</p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="rounded-full border-slate-200" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
