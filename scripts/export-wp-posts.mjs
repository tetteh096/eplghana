const posts = await fetch(
  'https://eplghana.org/wp-json/wp/v2/posts?per_page=100&_embed',
).then((r) => r.json())

for (const p of posts) {
  const img = p._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const firstImg = p.content.rendered.match(
    /src="(https:\/\/eplghana\.org\/wp-content\/uploads[^"]+)"/,
  )
  console.log(
    JSON.stringify({
      slug: p.slug,
      title: p.title.rendered.replace(/&#038;/g, '&').replace(/&amp;/g, '&'),
      date: p.date.split('T')[0],
      excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, '').trim().slice(0, 200),
      image: img || firstImg?.[1] || null,
      categories: p.categories,
    }),
  )
}
