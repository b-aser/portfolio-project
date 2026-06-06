'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { ModeToggle } from '@/components/Blog/mode-toggle'
import { Input } from '../ui/input'

export function SiteHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlQuery = pathname === '/blog' ? (searchParams.get('q') ?? '') : ''
  const [query, setQuery] = useState(urlQuery)

  useEffect(() => {
    if (pathname === '/blog') {
      setQuery(searchParams.get('q') ?? '')
    }
  }, [pathname, searchParams])

  useEffect(() => {
    if (pathname !== '/blog') return

    const params = new URLSearchParams(searchParams.toString())
    if (query.trim()) params.set('q', query.trim())
    else params.delete('q')

    const next = params.toString()
    if (next === searchParams.toString()) return
    router.replace(next ? `/blog?${next}` : '/blog', { scroll: false })
  }, [query, pathname, router, searchParams])

  const handleSubmit = () => {
    if (pathname === '/blog') return

    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    const next = params.toString()
    router.push(next ? `/blog?${next}` : '/blog')
  }

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-8">
        <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
          <ArrowLeftIcon className="h-4 w-4" />
        </Link>
        <Link href="/blog" className="text-lg font-semibold tracking-tight">
          Aser&apos;s Blog
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSubmit()
            }}
            placeholder="Title, author, date, or tag…"
            className="w-40 sm:w-52"
            aria-label="Search posts"
          />
          <Link href="/blog" className="hover:text-zinc-600 dark:hover:text-zinc-300">
            Posts
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

export function SiteHeaderFallback() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-8">
        <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
          <ArrowLeftIcon className="h-4 w-4" />
        </Link>
        <Link href="/blog" className="text-lg font-semibold tracking-tight">
          Aser&apos;s Blog
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="h-8 w-40 rounded-lg border border-input sm:w-52" />
          <Link href="/blog" className="hover:text-zinc-600 dark:hover:text-zinc-300">
            Posts
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
