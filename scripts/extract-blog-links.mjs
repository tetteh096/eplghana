const pages = [
  'https://eplghana.org/news-event/',
  'https://eplghana.org/blog-post/',
  'https://eplghana.org/publications-2/',
]

for (const url of pages) {
  const html = await fetch(url).then((r) => r.text())
  const posts = [...html.matchAll(/href="(https:\/\/eplghana\.org\/[^"]+)"[^>]*>[\s\S]*?Read more/gi)]
  const articleLinks = [...new Set([...html.matchAll(/href="(https:\/\/eplghana\.org\/20[^"]+)"/g)].map((m) => m[1]))]
  const imgs = [...html.matchAll(/data-src="(https:\/\/eplghana\.org\/wp-content\/uploads[^"]+)"/g)].map((m) => m[1])

  console.log('\n===', url, '===')
  console.log('Article links:', articleLinks.slice(0, 15).join('\n'))
  console.log('Images:', [...new Set(imgs)].join('\n'))
}
