'use client'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user } = useAuth()

  return (
    <Button variant="ghost" size="icon" asChild className="rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900">
      <Link href="/account" title="Account" aria-label="Account">
        <Avatar className="h-9 w-9 border border-slate-200">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
    </Button>
  )
}
