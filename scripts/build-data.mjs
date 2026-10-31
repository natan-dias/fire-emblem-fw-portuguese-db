// One-off: pulls the reference site's data and writes src/data/*.json + public/portraits/*.
// Usage: node scripts/build-data.mjs
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const BASE = 'https://fefw-planner-server.vercel.app'
const ART_PROFS = ['sword', 'lance', 'axe', 'bow', 'brawl', 'authority', 'infantry', 'riding', 'armor', 'flying']
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
// Hand-maintained recruitment for characters the reference API has no data for.
const recruitmentOverrides = JSON.parse(await readFile('src/data/recruitment-overrides.json', 'utf8'))

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
    arts: Object.fromEntries(ART_PROFS.map((p) => [p, u.learnsets?.[p] ?? {}])),
    recruitment: {
      ...Object.fromEntries(LORD_ROUTES.filter((r) => u.recruitment?.[r]).map((r) => [r, u.recruitment[r]])),
      ...recruitmentOverrides[slug(u.name)],
    },
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
// Combat arts (weapon proficiencies) with stats; `effect` is translated separately in src/i18n.
// Authority/Infantry/Riding/Armor/Flying learn skills instead, so only their names are kept.
// Hand-maintained stats for arts the reference API has no data for.
const artOverrides = JSON.parse(await readFile('src/data/arts-overrides.json', 'utf8'))
const arts = {}
for (const a of db.combatArts) {
  arts[a.id] = {
    name: a.name, prof: a.proficiency, cost: a.cost, might: a.might, hit: a.hit, crit: a.crit, range: a.range, effect: a.effect,
    ...artOverrides[a.id],
  }
}
const skillNames = {}
for (const s of db.skills) {
  if (!ART_PROFS.includes(s.type.toLowerCase())) continue
  skillNames[s.id] = s.name
  if (s.plus?.name) skillNames[`${s.id}+`] = s.plus.name
  if (s.plusPlus?.name) skillNames[`${s.id}++`] = s.plusPlus.name
}
await writeFile('src/data/arts.json', JSON.stringify({ arts, skillNames }, null, 2) + '\n')
// Paralogue availability windows per route ("month/day" in the in-game calendar).
const paralogues = db.paralogues.map((p) => ({ id: p.id, name: p.name, windows: p.windows }))
await writeFile('src/data/paralogues.json', JSON.stringify(paralogues, null, 2) + '\n')
// Growth rates: units have absolute percentages, classes have signed modifiers (+ optional level tiers).
const growthUnits = units.map((u) => ({ id: slug(u.name), growths: u.growths }))
const growthClasses = db.classes
  .filter((c) => c.growthMods || c.growthTiers)
  .map((c) => ({
    id: c.id,
    name: c.name,
    tier: c.tier,
    growths: c.growthMods ?? {},
    ...(c.growthTiers?.length && { tiers: c.growthTiers.map((t) => ({ level: t.level, growths: t.growths })) }),
  }))
await writeFile('src/data/growths.json', JSON.stringify({ units: growthUnits, classes: growthClasses }, null, 2) + '\n')
// Classes: full info + portraits. Ability descriptions are translated in src/i18n (keyed by the English text).
await mkdir('public/portraits/classes', { recursive: true })
const ability = (a) => (a?.name ? { name: a.name, description: a.description ?? '' } : null)
const classes = []
for (const c of db.classes) {
  const file = `${slug(c.name)}${c.portrait.slice(c.portrait.lastIndexOf('.'))}`
  const res = await fetch(BASE + c.portrait)
  if (!res.ok) throw new Error(`portrait failed for class ${c.name}`)
  await writeFile(`public/portraits/classes/${file}`, Buffer.from(await res.arrayBuffer()))
  classes.push({
    id: c.id,
    name: c.name,
    tier: c.tier,
    portrait: file,
    movement: c.movementType,
    mount: c.mountType ?? null,
    proficiencies: c.proficiencies ?? [],
    skills: [...(c.primarySkills ?? []), ...(c.secondarySkills ?? [])].map((s) => ({ type: s.skillTypeId, grade: s.grade })),
    bonusExp: c.bonusExp ?? [],
    growths: c.growthMods ?? {},
    abilities: (c.classAbilities ?? []).map(ability).filter(Boolean),
    mastered: ability(c.masteredAbility),
  })
}
await writeFile('src/data/classes.json', JSON.stringify(classes, null, 2) + '\n')
console.log(
  `${characters.length} characters, ${Object.keys(skills).length} skills, ${Object.keys(spells).length} spells, ${paralogues.length} paralogues, ${growthClasses.length} classes with growths, ${classes.length} classes`,
)
