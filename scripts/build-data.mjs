// One-off: pulls the reference site's data and writes src/data/*.json + public/portraits/*.
// Usage: node scripts/build-data.mjs
import { mkdir, writeFile } from 'node:fs/promises'

const BASE = 'https://fefw-planner-server.vercel.app'
const LORD_ROUTES = ['cai', 'dietrich', 'theodora', 'leda']

const slug = (s) =>
  s
    .normalize('NFKD')
    .replace(/\+$/, ' plus')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const db = await (await fetch(`${BASE}/api/data`)).json()
const units = db.units

const skills = {}
const addSkill = (s) => {
  if (!s.name) return null
  const id = slug(s.name)
  skills[id] = { name: s.name, description: s.description }
  return id
}

await mkdir('public/portraits', { recursive: true })
await mkdir('src/data', { recursive: true })

const characters = []
for (const u of units) {
  const file = `${slug(u.name)}${u.portrait.slice(u.portrait.lastIndexOf('.'))}`
  const res = await fetch(BASE + u.portrait)
  if (!res.ok) throw new Error(`portrait failed for ${u.name}`)
  await writeFile(`public/portraits/${file}`, Buffer.from(await res.arrayBuffer()))

  characters.push({
    id: slug(u.name),
    name: u.name,
    portrait: file,
    personalSkill: addSkill(u.personalSkill),
    uniqueSkills: (u.uniqueSkills ?? []).map(addSkill),
    whiteSpells: u.learnsets?.faith ?? {},
    blackSpells: u.learnsets?.reason ?? {},
    recruitment: Object.fromEntries(
      LORD_ROUTES.filter((r) => u.recruitment?.[r]).map((r) => [r, u.recruitment[r]]),
    ),
  })
}

await writeFile('src/data/characters.json', JSON.stringify(characters, null, 2) + '\n')
await writeFile('src/data/skills.json', JSON.stringify(skills, null, 2) + '\n')

// Only Faith (white) and Reason (black) spells; `effect` is translated separately in src/i18n.
const spells = {}
for (const s of db.spells) {
  spells[s.id] = {
    name: s.name,
    kind: s.proficiency === 'faith' ? 'white' : 'black',
    power: s.power,
    hit: s.hit,
    range: s.range,
    weight: s.weight,
    crit: s.crit,
    avo: s.avo,
    uses: s.uses,
    effect: s.effect,
  }
}
await writeFile('src/data/spells.json', JSON.stringify(spells, null, 2) + '\n')
console.log(`${characters.length} characters, ${Object.keys(skills).length} skills, ${Object.keys(spells).length} spells`)
