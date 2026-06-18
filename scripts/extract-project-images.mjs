import fs from 'fs'

for (const file of ['tmp-projects.html', 'tmp-wotr.html', 'tmp-psf.html']) {
  if (!fs.existsSync(file)) {
    console.log(`\n=== ${file} MISSING ===`)
    continue
  }
  const html = fs.readFileSync(file, 'utf8')
  console.log(`\n=== ${file} ===`)
  const urls = [
    ...new Set(
      [...html.matchAll(/data-src="(https:\/\/eplghana\.org\/wp-content\/uploads\/[^"]+)"/g)].map(
        (m) => m[1],
      ),
    ),
  ].filter((u) => !/logo|32x32|100x100|150x150|192x192|180x180|270x270|icon/i.test(u))

  urls.slice(0, 15).forEach((u) => console.log(u))

  // project section on listing page
  const idx = html.indexOf('Explore some of our PROJECTS')
  if (idx >= 0) {
    const chunk = html.slice(idx, idx + 12000)
    const projectImgs = [
      ...chunk.matchAll(/data-src="(https:\/\/eplghana\.org\/wp-content\/uploads\/[^"]+)"/g),
    ].map((m) => m[1])
    if (projectImgs.length) {
      console.log('--- project section ---')
      projectImgs.forEach((u) => console.log(u))
    }
  }
}
