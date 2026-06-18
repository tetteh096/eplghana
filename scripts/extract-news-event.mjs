const html = await fetch('https://eplghana.org/news-event/').then((r) => r.text())

// Featured stories read more
const readMore = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>\s*Read more/gi)].map((m) => m[1])
console.log('Read more links:', readMore)

// Headings with nearby content
const h3 = [...html.matchAll(/<h3[^>]*>([^<]+)<\/h3>/gi)].map((m) => m[1].trim())
console.log('H3:', h3)

// annual reports search
const annual = html.match(/annual report/gi)
console.log('annual mentions:', annual?.length ?? 0)

// Extract elementor flip box or card links
const allLinks = [...html.matchAll(/href="(\/[^"]+|https:\/\/eplghana\.org\/[^"]+)"/g)]
  .map((m) => m[1])
  .filter((l) => !l.includes('wp-content') && !l.includes('wp-json') && !l.includes('#'))
console.log('Internal links sample:', [...new Set(allLinks)].slice(0, 40))
