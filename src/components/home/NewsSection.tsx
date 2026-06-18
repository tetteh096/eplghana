import Image from 'next/image'
import Link from 'next/link'

import type { News } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type NewsSectionProps = {
  posts: News[]
}

export function NewsSection({ posts }: NewsSectionProps) {
  if (!posts.length) return null

  return (
    <section className="epl-section bg-epl-mist">
      <div className="epl-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="epl-section-subtitle">Knowledge Products</span>
            <h2 className="epl-section-title mt-2">News & Updates</h2>
          </div>
          <Link className="epl-btn-outline" href="/news">
            View All
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = getMediaUrl(post.featuredImage) ?? '/images/blog-img-1.jpg'

            return (
              <article key={post.id} className="epl-card group">
                <Link href={`/news/${post.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      src={imageUrl}
                    />
                  </div>
                  <div className="p-6">
                    <time className="text-xs font-semibold text-epl-secondary">
                      {formatDate(post.publishedAt)}
                    </time>
                    <h3 className="mt-2 text-xl font-bold text-epl-dark group-hover:text-epl-primary">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-epl-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-block text-sm font-semibold text-epl-secondary">
                      Read More →
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
