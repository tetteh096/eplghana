import fs from 'fs'

const html = fs.readFileSync('tmp-home.html', 'utf8')
const matches = [...html.matchAll(/https:\/\/eplghana\.org\/wp-content\/uploads\/[^"'\s\\]+/g)]
const urls = [...new Set(matches.map((m) => m[0].replace(/\\\//g, '/')))]

for (const url of urls.sort()) {
  console.log(url)
}
