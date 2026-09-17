import fs from 'fs'

const html = fs.readFileSync('tmp-fellows.html', 'utf8')
const cohortIdx = html.indexOf('Cohort VII Fellows')
const section = html.slice(cohortIdx, html.indexOf('Do You Want To Partner', cohortIdx))

// Each fellow card likely in e-con-child or column - split by CSP image
const blocks = [...section.matchAll(
  /data-src="(https:\/\/eplghana\.org\/wp-content\/uploads\/2025\/10\/CSP[^"]+)"([\s\S]{0,3500}?)(?=data-src="https:\/\/eplghana\.org\/wp-content\/uploads\/2025\/10\/CSP|$)/gi,
)]

function cleanHtml(text) {
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+\n/g, '\n')
    .trim()
}

function normalizePhoto(url) {
  if (url.includes('-683x1024')) return url
  if (url.includes('-scaled')) return url
  const base = url.replace(/-scaled\.(jpe?g)$/i, '').replace(/\.(jpe?g)$/i, '')
  return `${base}-683x1024.jpeg`
}

const fellows = blocks.map((m, index) => {
  const photo = normalizePhoto(m[1])
  const tail = m[2]
  const editors = [...tail.matchAll(/elementor-widget-text-editor[^>]*>([\s\S]*?)<\//gi)].map((e) =>
    cleanHtml(e[1]),
  )
  const name = editors.slice(0, 2).join(' ').replace(/\s+/g, ' ').trim()
  const institution = editors[2] ?? editors[1] ?? ''
  return {
    id: `cohort-vii-${index + 1}`,
    name: name || editors[0] || 'Fellow',
    institution,
    photo,
    editors,
  }
})

console.log(JSON.stringify(fellows, null, 2))
console.error('Count', fellows.length)
console.error('Sample editors:', fellows[0]?.editors, fellows[1]?.editors)
