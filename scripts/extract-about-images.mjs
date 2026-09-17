import fs from 'fs'

const html = fs.readFileSync('tmp-about.html', 'utf8')
const urls = [
  ...new Set(
    [...html.matchAll(/data-src="(https:\/\/eplghana\.org\/wp-content\/uploads\/[^"]+)"/g)].map(
      (m) => m[1],
    ),
  ),
].filter((u) => !/logo|32x32|100x100|150x150|192x192|180x180|270x270|icon/i.test(u))

urls.forEach((u) => console.log(u))
