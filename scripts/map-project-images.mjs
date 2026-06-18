import fs from 'fs'

const html = fs.readFileSync('tmp-projects.html', 'utf8')

// Find text blocks after each of the 6 top images
const imgs = [
  'CSOT-6-1024x683',
  'IMG_7200-1024x683',
  'EPL-Watermark-253-of-329',
  '20240830135443__MG_7840',
  'EPL-Watermark-495-of-664',
  'CSOT-15-1024x683',
]

for (const key of imgs) {
  const idx = html.indexOf(key)
  const snippet = html.slice(idx, idx + 2500)
  const title = snippet.match(/elementor-heading-title[^>]*>([^<]+)</)?.[1]
  const h3 = snippet.match(/<h3[^>]*>([^<]+)<\/h3>/)?.[1]
  console.log('\n' + key)
  console.log('  heading:', title?.trim() ?? h3?.trim() ?? 'n/a')
}

// Bottom 3 cards section
for (const key of ['CSOT-78-scaled', 'IMG_7245-scaled', 'MG_0422-scaled']) {
  const idx = html.indexOf(key)
  const snippet = html.slice(idx, idx + 3500)
  const title = snippet.match(/Public Service Fellowship|Women on the Rise|P\.E\.A\.C\.E|elementor-heading-title[^>]*>([^<]+)</)
  console.log('\n' + key)
  console.log('  near:', title?.[0] ?? title?.[1] ?? 'n/a')
}
