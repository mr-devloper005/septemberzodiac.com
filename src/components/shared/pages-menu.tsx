'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, BookOpen, Briefcase, Newspaper, Mail, HelpCircle, Activity, Shield, Scale, Cookie, FileBadge } from 'lucide-react'
import { cn } from '@/lib/utils'

const pagesMenuCompany = [
  { href: '/about', label: 'About', icon: BookOpen },
  { href: '/careers', label: 'Careers', icon: Briefcase },
  { href: '/press', label: 'Press', icon: Newspaper },
  { href: '/contact', label: 'Contact', icon: Mail },
] as const

const pagesMenuSupport = [
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/status', label: 'Status', icon: Activity },
] as const

const pagesMenuLegal = [
  { href: '/privacy', label: 'Privacy', icon: Shield },
  { href: '/terms', label: 'Terms', icon: Scale },
  { href: '/cookies', label: 'Cookies', icon: Cookie },
  { href: '/licenses', label: 'Licenses', icon: FileBadge },
] as const

export function PagesMenu({ triggerClassName }: { triggerClassName: string }) {
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className={triggerClassName}>
          Pages
          <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-slate-200/90 bg-white/98 p-1 backdrop-blur-md">
        <DropdownMenuLabel className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Company</DropdownMenuLabel>
        {pagesMenuCompany.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <DropdownMenuItem key={item.href} asChild className={active ? 'bg-slate-100' : ''}>
              <Link href={item.href} className="flex cursor-pointer items-center gap-2">
                <Icon className="h-4 w-4 text-slate-600" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Support</DropdownMenuLabel>
        {pagesMenuSupport.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <DropdownMenuItem key={item.href} asChild className={active ? 'bg-slate-100' : ''}>
              <Link href={item.href} className="flex cursor-pointer items-center gap-2">
                <Icon className="h-4 w-4 text-slate-600" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Legal</DropdownMenuLabel>
        {pagesMenuLegal.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <DropdownMenuItem key={item.href} asChild className={active ? 'bg-slate-100' : ''}>
              <Link href={item.href} className="flex cursor-pointer items-center gap-2">
                <Icon className="h-4 w-4 text-slate-600" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
