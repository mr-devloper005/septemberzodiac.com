'use client'

import Link from 'next/link'
import { ChevronDown, Plus, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function ArticleCreateButton({ buttonClassName }: { buttonClassName: string }) {
  const enabled = SITE_CONFIG.tasks.filter((t) => t.enabled)

  if (enabled.length === 0) return null

  if (enabled.length === 1) {
    const only = enabled[0]
    return (
      <Button size="sm" asChild className={`shrink-0 gap-1.5 rounded-full px-4 ${buttonClassName}`}>
        <Link href={`/create/${only.key}`}>
          <Plus className="h-4 w-4" />
          Create
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className={`shrink-0 gap-1.5 rounded-full px-4 ${buttonClassName}`}>
          <Plus className="h-4 w-4" />
          Create
          <ChevronDown className="h-3 w-3 opacity-80" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-slate-200/90 bg-white/98 backdrop-blur-md">
        {enabled.map((task) => {
          const Icon = taskIcons[task.key] || LayoutGrid
          return (
            <DropdownMenuItem key={task.key} asChild>
              <Link href={`/create/${task.key}`}>
                <Icon className="mr-2 h-4 w-4" />
                Create {task.label}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
