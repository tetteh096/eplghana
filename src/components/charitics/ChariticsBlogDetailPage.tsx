import Link from 'next/link'

import { BlogRichText } from '@/components/charitics/BlogRichText'
import { ChariticsBlogSidebar } from '@/components/charitics/ChariticsBlogSidebar'
import type { BlogPostSummary } from '@/config/blogContent'
import type { BlogListingMeta } from '@/utilities/getBlogPosts'
import type { BlogPostDetail } from '@/utilities/fetchWordPressPost'
import { formatDate } from '@/utilities/formatDate'

type ChariticsBlogDetailPageProps = {
  meta: BlogListingMeta
  post: BlogPostDetail
  recentPosts: BlogPostSummary[]
}

export function ChariticsBlogDetailPage({ meta, post, recentPosts }: ChariticsBlogDetailPageProps) {
  return (
    <div className="ul-section-spacing">
      <div className="ul-container">
        <div className="row ul-bs-row gy-5 flex-column-reverse flex-md-row">
          <div className="col-lg-4 col-md-5">
            <ChariticsBlogSidebar meta={meta} recentPosts={recentPosts} />
          </div>

          <div className="col-lg-8 col-md-7">
            <article className="ul-blog-details ul-blog-inner mb-0">
              <div className="ul-blog-2 ul-blog-inner">
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
                  <h2 className="ul-blog-title">{post.title}</h2>
                  <div className="ul-donation-details-summary-txt ul-blog-details-txt">
                    {post.content ? (
                      <BlogRichText className="epl-blog-rich-text" content={post.content} />
                    ) : (
                      post.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                      ))
                    )}
                    {post.blockquote ? <blockquote>{post.blockquote}</blockquote> : null}
                    {post.galleryImages.length > 0 ? (
                      <div className="ul-donation-details-summary-imgs">
                        {post.galleryImages.slice(0, 2).map((image) => (
                          <img alt="" key={image} src={image} />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="ul-blog-details-actions">
                <div className="tags-wrapper">
                  <h4 className="actions-title">Tags:</h4>
                  <div className="ul-blog-sidebar-tags tags">
                    {post.tags.map((tag) => (
                      <Link href={`/news?q=${encodeURIComponent(tag)}`} key={tag}>
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="shares-wrapper">
                  <h4 className="actions-title">Share:</h4>
                  <div className="share-options">
                    <a
                      aria-label="Share on Facebook"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://eplghana.org/news/${post.slug}`)}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="flaticon-facebook"></i>
                    </a>
                    <a
                      aria-label="Share on X"
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://eplghana.org/news/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="flaticon-twitter"></i>
                    </a>
                    <a
                      aria-label="Share on LinkedIn"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://eplghana.org/news/${post.slug}`)}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="flaticon-linkedin-big-logo"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Link className="ul-btn" href="/news">
                  <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Back to Blog
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
