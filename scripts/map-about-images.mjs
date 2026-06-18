import fs from 'fs'

const html = fs.readFileSync('tmp-about.html', 'utf8')

const keys = [
  'WhatsApp-Image-2025-06-12',
  'HN7A8676',
  'CSOT-35',
  'CSOE-46',
  'CSOE-80-1',
  'leadership_18224975',
  'CSP25-scaled',
  'CSP3-scaled',
  'CSP61-scaled',
  'CSP41-scaled',
]

for (const key of keys) {
  const idx = html.indexOf(key)
  const snippet = html.slice(Math.max(0, idx - 500), idx + 2000)
  const heading = snippet.match(
    /elementor-heading-title[^>]*>([^<]+)|MISSION|VISION|Beyond the Numbers|About us|Our Approach|WHY PARTNER|Testimonials/gi,
  )
  console.log('\n' + key)
  console.log('  context:', [...new Set(heading?.slice(0, 5) ?? [])].join(' | '))
}

// mission/vision blocks
for (const label of ['OUR MISSION', 'OUR VISION', 'Beyond the Numbers']) {
  const idx = html.indexOf(label)
  if (idx < 0) continue
  const snippet = html.slice(idx, idx + 4000)
  const img = snippet.match(/data-src="(https:\/\/eplghana\.org\/wp-content\/uploads\/[^"]+)"/)?.[1]
  console.log('\n' + label + ' -> ' + (img ?? 'no img'))
}
