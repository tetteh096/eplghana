import Link from 'next/link'

import { ChariticsBlogSidebar } from '@/components/charitics/ChariticsBlogSidebar'
import { blogPageContent, type BlogPostSummary } from '@/config/blogContent'
import type { BlogListingMeta } from '@/utilities/getBlogPosts'
import { formatDate } from '@/utilities/formatDate'

type ChariticsBlogListingPageProps = {
  meta: BlogListingMeta
  posts: BlogPostSummary[]
  recentPosts: BlogPostSummary[]
  searchQuery?: string
  activeCategory?: string
}

export function ChariticsBlogListingPage({
  meta,
  posts,
  recentPosts,
  searchQuery = '',
  activeCategory,
}: ChariticsBlogListingPageProps) {
  return (
    <div className="ul-section-spacing">
      <div className="ul-container">
        <div className="epl-blog-intro mb-5">
          <p className="ul-section-descr mb-0">{blogPageContent.hero.lead}</p>
        </div>

        <div className="row ul-bs-row gy-5 flex-column-reverse flex-md-row">
          <div className="col-lg-4 col-md-5">
            <ChariticsBlogSidebar
              activeCategory={activeCategory}
              meta={meta}
              recentPosts={recentPosts}
              searchQuery={searchQuery}
            />
          </div>

          <div className="col-lg-8 col-md-7">
            {posts.length > 0 ? (
              <div>
                {posts.map((post) => (
                  <article className="ul-blog ul-blog-2 ul-blog-inner" key={post.slug}>
                    <div className="ul-blog-img">
                      <img alt={post.title} src={post.image} />
                    </div>
                    <div className="ul-blog-txt">
                      <div className="ul-blog-infos">
                        <div className="ul-blog-info">
                          <span className="icon">
                            <i className="flaticon-account"></i>
                          </span>
                          <span className="text">{post.author ?? 'EPL Ghana'}</span>
                        </div>
                        <div className="ul-blog-info">
                          <span className="icon">
                            <i className="flaticon-price-tag"></i>
                          </span>
                          <span className="text">{post.category}</span>
                        </div>
                        <div className="ul-blog-info">
                          <span className="icon">
                            <i className="flaticon-calendar"></i>
                          </span>
                          <span className="text">{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                      <Link className="ul-blog-title" href={`/news/${post.slug}`}>
                        {post.title}
                      </Link>
                      <p className="ul-blog-excerpt">{post.excerpt}</p>
                      <Link className="ul-btn" href={`/news/${post.slug}`}>
                        <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Read
                        More
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="ul-section-descr">
                No blog posts match your search. Try a different keyword or browse recent posts in
                the sidebar.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
