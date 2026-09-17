import Link from 'next/link'

import type { BlogListingMeta } from '@/utilities/getBlogPosts'
import type { BlogPostSummary } from '@/config/blogContent'
import { formatDate } from '@/utilities/formatDate'

type ChariticsBlogSidebarProps = {
  meta: BlogListingMeta
  recentPosts: BlogPostSummary[]
  searchQuery?: string
  activeCategory?: string
}

export function ChariticsBlogSidebar({
  meta,
  recentPosts,
  searchQuery = '',
  activeCategory,
}: ChariticsBlogSidebarProps) {
  const { categories, tags } = meta

  return (
    <div className="ul-inner-sidebar">
      <div className="ul-inner-sidebar-widget ul-inner-sidebar-search">
        <h3 className="ul-inner-sidebar-widget-title">Search</h3>
        <div className="ul-inner-sidebar-widget-content">
          <form action="/news" className="ul-blog-search-form">
            <input
              defaultValue={searchQuery}
              name="q"
              placeholder="Search Here"
              type="search"
            />
            <button type="submit">
              <span className="icon">
                <i className="flaticon-search"></i>
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className="ul-inner-sidebar-widget categories">
        <h3 className="ul-inner-sidebar-widget-title">Categories</h3>
        <div className="ul-inner-sidebar-widget-content">
          <div className="ul-inner-sidebar-categories">
            <Link
              className={!activeCategory ? 'is-active' : undefined}
              href="/news"
            >
              All posts
            </Link>
            {categories.map((category) => (
              <Link
                className={activeCategory === category.slug ? 'is-active' : undefined}
                href={`/news?category=${encodeURIComponent(category.slug)}`}
                key={category.slug}
              >
                {category.label} <span>({category.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="ul-inner-sidebar-widget posts">
        <h3 className="ul-inner-sidebar-widget-title">Recent Posts</h3>
        <div className="ul-inner-sidebar-widget-content">
          <div className="ul-inner-sidebar-posts">
            {recentPosts.map((post) => (
              <div className="ul-inner-sidebar-post" key={post.slug}>
                <div className="img">
                  <img alt={post.title} src={post.image} />
                </div>
                <div className="txt">
                  <h4 className="title">
                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <span className="date">
                    <span>{formatDate(post.publishedAt)}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ul-inner-sidebar-widget tags">
        <h3 className="ul-inner-sidebar-widget-title">Tag Cloud</h3>
        <div className="ul-inner-sidebar-widget-content">
          <div className="ul-inner-sidebar-tags">
            {tags.map((tag) => (
              <Link href={`/news?q=${encodeURIComponent(tag)}`} key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
