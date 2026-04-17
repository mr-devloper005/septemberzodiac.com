'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'

export function RegisterForm({ buttonClassName }: { buttonClassName: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [intent, setIntent] = useState('')
  const { signup, isLoading } = useAuth()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await signup(name, email, password)
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="register-name">Full name</Label>
        <Input
          id="register-name"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jordan Lee"
          className="h-12 rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="h-12 rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-password">Password</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="h-12 rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-intent">What are you reading or writing?</Label>
        <Input
          id="register-intent"
          name="intent"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          placeholder="Essays, reporting, fiction…"
          className="h-12 rounded-xl"
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full text-sm font-semibold ${buttonClassName}`}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account
          </>
        ) : (
          'Create account'
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">Your profile is saved locally on this device after signup.</p>
      <p className={`text-center text-sm`}>
        <span className="text-muted-foreground">Already have an account? </span>
        <Link href="/login" className="inline-flex items-center gap-1 font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
