'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Mail, User as UserIcon } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export default function AccountPage() {
  const [mounted, setMounted] = useState(false)
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleSignOut() {
    logout()
    router.push('/')
    router.refresh()
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-slate-950">
        <NavbarShell />
        <main className="mx-auto max-w-lg px-4 py-24 text-center text-sm text-slate-500">Loading…</main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-slate-950">
        <NavbarShell />
        <main className="mx-auto max-w-lg px-4 py-16 sm:py-24">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm text-slate-600">You are not signed in.</p>
            <Button asChild className="mt-6 rounded-full bg-slate-900 text-white hover:bg-slate-800">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-950">
      <NavbarShell />
      <main className="mx-auto max-w-lg px-4 py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Your account</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Sign-in details</h1>
        <p className="mt-2 text-sm text-slate-600">Information stored for this session on this device.</p>

        <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="flex flex-col items-center gap-4 border-b border-slate-200/80 pb-6">
            <Avatar className="h-20 w-20 border border-slate-200">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="mt-1 text-sm text-slate-500">Member since {user.joinedDate}</p>
            </div>
          </div>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
                <dd className="mt-0.5 break-all font-medium text-slate-900">{user.email}</dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <UserIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Display name</dt>
                <dd className="mt-0.5 font-medium text-slate-900">{user.name}</dd>
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">User ID</dt>
              <dd className="mt-0.5 font-mono text-xs text-slate-700">{user.id}</dd>
            </div>
          </dl>

          <Button
            type="button"
            variant="outline"
            className="mt-8 w-full rounded-full border-slate-200 text-slate-900 hover:bg-slate-50"
            onClick={handleSignOut}
            disabled={isLoading}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
