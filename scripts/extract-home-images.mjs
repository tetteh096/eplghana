import fs from 'fs'

const html = fs.readFileSync('tmp-home.html', 'utf8')

// Mission slideshow URLs from Elementor data-settings JSON
const galleryJson = html.match(/background_slideshow_gallery":\[([^\]]+)\]/)
if (galleryJson) {
  const urls = [...galleryJson[1].matchAll(/https:\\\/\\\/eplghana\.org\\\/wp-content\\\/uploads\\\/[^"]+/g)]
  console.log('Mission slideshow:')
  urls.forEach((m) => console.log(m[0].replace(/\\\//g, '/')))
}

// Project section images (data-src near project headings)
const idx = html.indexOf('Explore some of our PROJECTS')
if (idx >= 0) {
  const chunk = html.slice(idx, idx + 8000)
  const imgs = [...chunk.matchAll(/data-src="(https:\/\/eplghana\.org\/wp-content\/uploads\/[^"]+)"/g)]
  console.log('\nProject section images:')
  imgs.forEach((m) => console.log(m[1]))
}

// News/blog featured images
const newsIdx = html.indexOf('PSF Cohort VI Graduation')
if (newsIdx >= 0) {
  const chunk = html.slice(Math.max(0, newsIdx - 2000), newsIdx + 4000)
  const imgs = [...chunk.matchAll(/data-src="(https:\/\/eplghana\.org\/wp-content\/uploads\/[^"]+)"/g)]
  console.log('\nNews area images:')
  imgs.forEach((m) => console.log(m[1]))
}
