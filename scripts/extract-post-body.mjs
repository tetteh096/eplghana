const slugs = [
  'staying-to-build-epl-ghana-celebrates-graduation-of-sixth-cohort-of-public-service-fellows',
  'breaking-barriers-empowering-women-to-attain-higher-leadership-heights-copy',
  'our-cohort-vi-fellows-distinguished-themselves-in-service-copy',
]

for (const slug of slugs) {
  const post = await fetch(
    `https://eplghana.org/wp-json/wp/v2/posts?slug=${slug}`,
  ).then((r) => r.json())
  const p = post[0]
  const paragraphs = [...p.content.rendered.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, '').trim())
    .filter(Boolean)
  console.log('\n===', slug, '===')
  console.log(JSON.stringify(paragraphs.slice(0, 6), null, 2))
}
