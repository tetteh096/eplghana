import fs from 'fs'

const html = fs.readFileSync('tmp-peace.html', 'utf8')
const matches = [...html.matchAll(/https:\/\/eplghana\.org\/wp-content\/uploads\/[^"'\s\\]+/g)]
const urls = [...new Set(matches.map((m) => m[0].replace(/\\\//g, '/')))]

for (const url of urls.sort()) {
  if (!/logo|32x32|100x100|150x150|192x192|180x180|270x270|icon/i.test(url)) {
    console.log(url)
  }
}
