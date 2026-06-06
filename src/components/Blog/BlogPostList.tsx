'use client'

import { PostCard } from '@/components/Blog/PostCard'
import {
  BLOG_SORT_OPTIONS,
  filterPosts,
  isBlogSort,
  sortPosts,
  type BlogSort,
} from '@/lib/blog-list'
import type { PostListItem } from '@/lib/posts'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  posts: PostListItem[]
  initialSort?: BlogSort
}

export function BlogPostList({
  posts,
  initialSort = 'latest',
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [sort, setSort] = useState(initialSort)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (sort !== 'latest') params.set('sort', sort)
    else params.delete('sort')

    const next = params.toString()
    if (next === searchParams.toString()) return
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false })
  }, [sort, router, pathname, searchParams])

  const visiblePosts = useMemo(() => {
    return sortPosts(filterPosts(posts, query), sort)
  }, [posts, query, sort])

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    const next = params.toString()
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false })
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <span className="font-medium">Sort by</span>
          <select
            value={sort}
            onChange={(event) => {
              const value = event.target.value
              if (isBlogSort(value)) setSort(value)
            }}
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            {BLOG_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mb-8 text-sm text-muted-foreground">
        {visiblePosts.length === posts.length
          ? `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`
          : `${visiblePosts.length} of ${posts.length} posts`}
      </p>

      {visiblePosts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
          <p className="text-zinc-600 dark:text-zinc-400">
            No posts match your search.
          </p>
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="mt-3 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <PostCard post={visiblePosts[0]} showMeta variant="featured" />
          {visiblePosts.length > 1 && (
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {visiblePosts.slice(1).map((post) => (
                <PostCard key={post.id} post={post} showMeta variant="grid" />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
