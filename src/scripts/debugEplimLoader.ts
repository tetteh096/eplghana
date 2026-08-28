import 'dotenv/config'

import { getEplimProjectContent } from '../utilities/getEplimProjectContent'

const a = await getEplimProjectContent('epl-in-maritime')
const b = await getEplimProjectContent('eplim')

console.log('[loader epl-in-maritime]', a.hero.title)
console.log('[loader eplim]', b.hero.title)
process.exit(0)
