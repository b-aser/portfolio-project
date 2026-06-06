import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BlogPostList } from '@/components/Blog/BlogPostList'
import { isBlogSort } from '@/lib/blog-list'
import { getPublishedPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'All posts',
  description: 'Browse all published posts. Search by title, author, date, or tag.',
}

type Props = {
  searchParams: Promise<{ q?: string; sort?: string }>
}

export default async function BlogIndexPage({ searchParams }: Props) {
  const params = await searchParams
  const posts = await getPublishedPosts()
  const initialSort = isBlogSort(params.sort) ? params.sort : 'latest'

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading posts…</p>}>
        <BlogPostList posts={posts} initialSort={initialSort} />
      </Suspense>
    </main>
  )
}
