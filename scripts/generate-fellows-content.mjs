import fs from 'fs'

const html = fs.readFileSync('tmp-fellows.html', 'utf8')
const cohortIdx = html.indexOf('Cohort VII Fellows')
const section = html.slice(cohortIdx, html.indexOf('Do You Want To Partner', cohortIdx))

const blocks = [...section.matchAll(
  /data-src="(https:\/\/eplghana\.org\/wp-content\/uploads\/2025\/10\/CSP[^"]+)"([\s\S]{0,3500}?)(?=data-src="https:\/\/eplghana\.org\/wp-content\/uploads\/2025\/10\/CSP|$)/gi,
)]

function normalizePhoto(url) {
  if (url.includes('-683x1024')) return url
  if (url.includes('-scaled')) return url
  const base = url.replace(/-scaled\.(jpe?g)$/i, '').replace(/\.(jpe?g)$/i, '')
  return `${base}-683x1024.jpeg`
}

function cleanInstitution(text) {
  return text
    .replace(/&#8211;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

const canonical = [
  ['Napare Mohammed', 'GES – STEM Office'],
  ['Priscilla Elorm', 'Ministry of Health'],
  ['Elsie Naa Adjeley', 'Ministry of Finance'],
  ['Rashida Sibawei', 'Ministry of Energy'],
  ['Abigail Asiedu', 'GES – STEM Office'],
  ['Truelove K. Boateng', 'NCCE'],
  ['Mawulolo Anane', 'NCCE'],
  ['Ruth Bortsie', 'NCCE'],
  ['Andy Kwaku Mensah', 'NCCE'],
  ['Henrietta Gyamfuah', 'Ministry of Health'],
  ['Rafia Idi', 'NCCE'],
  ['Thyra Darley Fordjor', 'NCCE'],
  ['Maris Amo', 'NDPC'],
  ['Ubeidat Alhassan', 'ACEPA'],
  ['Elita Y. Amoroh', 'GCX'],
  ['Anita Elorm', 'Office of the Head of Civil Service'],
  ['Abigail A. Asante', 'Millennium Development Authority'],
  ['Sandra Opokuah', 'GES – STEM Office'],
  ['Paul K. A. Anaman', 'Lands Commission'],
  ['Macjordan A. Odai', 'NCCE'],
  ['Rebecca Abugri', 'Pantang General Hospital'],
  ['Nimatu A. Rahaman', 'CHRAJ'],
  ['Rita Dagba', 'NCCE'],
  ['Michelle Y. De Veer', 'NITA'],
  ['Mohammed Abukari', 'Pantang General Hospital'],
  ['Richard Tii Zangine', 'NCCE'],
  ['Miriam Agumo', 'Office of the Head of Civil Service'],
  ['Lukman Iddrisu', 'NCCE'],
  ['Yusifu Mohammed', 'NCCE'],
  ['Leticia V. Noonoo', 'NDPC'],
  ['Abigail K. Nartey', 'Ministry of Finance'],
  ['Anna Kpo', 'CHRAJ'],
  ['Joyce Ankomah', 'GES – STEM Unit'],
  ['Gideon Osei Kofi', 'GES – STEM Unit'],
  ['Vanessa Nkrumah', 'CHRAJ'],
  ['Sandra Attipoe', 'GCX'],
  ['Cecilia Amuzu', 'Lands Commission'],
  ['Mary Fremah Adu', 'Ministry of Energy'],
  ['Josephine Babamonwe', 'CHRAJ'],
  ['Henry T. M. Tetteh', 'GCX'],
  ['Elsie Owusu-Mensah', 'NCCE'],
  ['Linda Dassah', 'NCCE'],
]

const photos = blocks.map((m) => normalizePhoto(m[1]))
if (photos.length !== canonical.length) {
  console.error(`Photo count ${photos.length} !== canonical ${canonical.length}`)
}

const fellows = canonical.map(([name, institution], i) => ({
  id: `cohort-vii-${i + 1}`,
  name,
  institution,
  photo: photos[i],
}))

const highlightIdx = html.indexOf('Fellows Highlight')
const highlightSection = html.slice(highlightIdx, cohortIdx)
const highlightImgs = [...highlightSection.matchAll(/data-src="(https:\/\/eplghana\.org\/wp-content\/uploads\/[^"]+)"/g)]
  .map((m) => m[1])
  .filter((u) => !/logo|icon/i.test(u))

const highlightParas = highlightSection
  .match(/elementor-widget-text-editor[^>]*>([\s\S]{0,4000}?)<\//gi)
  ?.slice(0, 2)
  .map((m) =>
    m[1]
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim(),
  ) ?? []

const content = `import { EPL_MEDIA } from '@/config/eplMedia'

export type CurrentFellow = {
  id: string
  name: string
  institution: string
  photo: string
}

export const currentFellowsPageContent = {
  hero: {
    eyebrow: 'EPL Fellows',
    title: 'Current Public Service Fellows',
    lead:
      'The Public Service Fellowship brings together exceptional young Ghanaians who are redefining leadership in public service. Our current fellows are serving in key government institutions, driving innovation, integrity, and impact across the nation.',
    image: '${highlightImgs[2] ?? `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`}',
    secondaryImage: '${highlightImgs[3] ?? `${EPL_MEDIA}/2025/10/CSOE-48-1024x683.jpg`}',
  },
  highlights: [
    {
      name: 'Rashida Sibawei',
      institution: 'Ministry of Energy',
      title: 'Youth in Energy Summit',
      body: ${JSON.stringify(highlightParas[0] ?? 'Heralded as a dynamic force in sustainable development, Miss Rashida Sibawei has been selected as a featured speaker at the highly anticipated Youth in Energy Summit. Her session will delve into the core of next-generation energy transition, offering actionable blueprints for policy and implementation.')},
      photo: '${photos[3]}',
    },
    {
      name: 'Linda Dassah',
      institution: 'NCCE',
      title: 'Youth Sounding Board Ghana',
      body: ${JSON.stringify(highlightParas[1] ?? 'Linda Dassah is a founding member of the Youth Sounding Board (YSB) Ghana, where she plays a crucial role in shaping EU-Ghana and Netherlands policy dialogues.')},
      photo: '${photos[photos.length - 1]}',
    },
  ],
  cohort: {
    label: 'Cohort VII Fellows',
    count: ${fellows.length},
  },
  cta: {
    title: 'Create Your Journey',
    body: 'Learn more about the Public Service Fellowship and join the next cohort of leaders transforming governance.',
    ctaLabel: 'Learn More',
    ctaHref: '/projects/public-service-fellowship',
    image: '${highlightImgs[0] ?? photos[0]}',
  },
  fellows: ${JSON.stringify(fellows, null, 2).replace(/"([^"]+)":/g, '$1:')} as CurrentFellow[],
}
`

fs.writeFileSync('src/config/currentFellowsContent.ts', content)
console.log('Wrote currentFellowsContent.ts with', fellows.length, 'fellows')
