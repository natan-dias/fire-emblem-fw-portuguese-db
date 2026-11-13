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
// Level-1 base stats + Beginner/Specialty classes from the community sheet (tab "Base Stats").
const SHEET = 'https://docs.google.com/spreadsheets/d/12Lrk_M4_cgy6P0_WB9QXknDLDjyKtbeUkhWk32pTGqo/export?format=csv&gid=0'
const parseCsv = (text) => {
  const rows = []
  let row = [], cell = '', q = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++ }
      else if (ch === '"') q = false
      else cell += ch
    } else if (ch === '"') q = true
    else if (ch === ',') { row.push(cell); cell = '' }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++
      row.push(cell); rows.push(row); row = []; cell = ''
    } else cell += ch
  }
  if (cell || row.length) { row.push(cell); rows.push(row) }
  return rows.filter((r) => r.some(Boolean))
}
const [header, ...sheetRows] = parseCsv(await (await fetch(SHEET)).text())
const col = (r, name) => r[header.indexOf(name)]
const STAT_KEYS = ['hp', 'str', 'mag', 'spd', 'dex', 'def', 'res', 'lck', 'cha']
const baseStats = sheetRows.map((r) => ({
  id: slug(col(r, 'Character')),
  level1: Object.fromEntries(STAT_KEYS.map((k) => [k, Number(col(r, k === 'hp' ? 'HP' : k.charAt(0).toUpperCase() + k.slice(1)))])),
  beginner: col(r, 'Beginner'),
  specialty: col(r, 'Specialty'),
}))
const knownIds = new Set(characters.map((c) => c.id))
const unmatched = baseStats.filter((b) => !knownIds.has(b.id)).map((b) => b.id)
if (unmatched.length) console.warn('base stats: unmatched characters:', unmatched.join(', '))
const classNames = new Set(db.classes.map((c) => c.name))
const badClasses = baseStats.flatMap((b) => [b.beginner, b.specialty]).filter((n) => !classNames.has(n))
if (badClasses.length) console.warn('base stats: unknown classes:', [...new Set(badClasses)].join(', '))
await writeFile('src/data/base-stats.json', JSON.stringify(baseStats, null, 2) + '\n')
// Mounts and battalions: kept as in the reference (effects/locations are translated in src/i18n).
const mounts = db.mounts.map((m) => ({ id: m.id, type: m.type, name: m.name, stats: m.stats, growths: m.growths, abilities: m.abilities, location: m.location }))
await writeFile('src/data/mounts.json', JSON.stringify(mounts, null, 2) + '\n')
const battalions = db.battalions.map((b) => ({ id: b.id, name: b.name, category: b.category, rank: b.rank, gatherLimit: b.gatherLimit, ability: b.ability, stats: b.stats, location: b.location }))
await writeFile('src/data/battalions.json', JSON.stringify(battalions, null, 2) + '\n')
// Classes: full info + portraits. Ability descriptions are translated in src/i18n (keyed by the English text).
await mkdir('public/portraits/classes', { recursive: true })
const ability = (a) => (a?.name ? { name: a.name, description: a.description ?? '' } : null)
// Skill Rank abilities (equippable) + mastery descriptions come from the Fire Emblem Wiki (CC BY-SA) list page.
// If the wiki is unreachable, the existing src/data/skill-abilities.json is kept.
const WIKI = 'https://fireemblemwiki.org/wiki/List_of_abilities_in_Fire_Emblem:_Fortune%27s_Weave'
const wikiText = (h) =>
  h
    .replace(/<img[^>]*alt="([^"]*)"[^>]*>/g, ' $1 ')
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&#160;|&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim()
const wikiRows = (html, id) => {
  const start = html.indexOf(`id="${id}"`)
  const end = html.indexOf('<h2', start + 10)
  const table = html.slice(html.indexOf('<table', start), end < 0 ? undefined : end)
  return [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)]
    .map((m) => [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) => wikiText(c[1])))
    .filter((r) => r.length === 4 && r[1] !== 'Ability')
    .map(([, name, description, unlock]) => ({ name, description, unlock }))
}
let masteryWiki = {}
let classWiki = {} // class name -> [{ name, description }] from the wiki's Class abilities table
try {
  const res = await fetch(WIKI, { headers: { 'User-Agent': 'fefw-pt-db-build-script' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const html = await res.text()
  const skillAbilities = wikiRows(html, 'Skill_abilities')
  if (skillAbilities.length < 50) throw new Error(`only ${skillAbilities.length} skill abilities parsed`)
  await writeFile('src/data/skill-abilities.json', JSON.stringify(skillAbilities, null, 2) + '\n')
  masteryWiki = Object.fromEntries(wikiRows(html, 'Class_mastery_abilities').flatMap((r) => r.unlock.split(', ').map((cls) => [cls, { name: r.name, description: r.description }])))
  for (const r of wikiRows(html, 'Class_abilities')) {
    for (const cls of r.unlock.split(', ')) (classWiki[cls] ??= []).push({ name: r.name, description: r.description })
  }
  console.log(`${skillAbilities.length} skill abilities from the wiki`)
} catch (e) {
  console.warn('wiki abilities skipped (kept existing file):', e.message)
}
// Mastery abilities the source lacks a description for (e.g. "HP +5?") fall back to the wiki entry for that class.
const withMastery = (a, className) => (a && !a.description && masteryWiki[className] ? masteryWiki[className] : a)
// The source misses or mis-values a few class abilities; these classes are corrected from the wiki
// (everything else is kept as in the source). Matching ignores the "[CA] " tag and trailing numbers.
const WIKI_FIXED_CLASSES = ['Celestial Trooper', 'Great Knight', 'Valkyrium']
const stem = (n) => n.replace(/^\[CA\] /, '').replace(/ [+-]?\d+$/, '')
const mergeClassAbilities = (list, className) => {
  if (!WIKI_FIXED_CLASSES.includes(className)) return list
  const out = [...list]
  for (const w of classWiki[className] ?? []) {
    if (out.some((a) => a.name === w.name)) continue
    const i = out.findIndex((a) => stem(a.name) === stem(w.name))
    if (i < 0) out.push(w)
    else out[i] = w
  }
  return out
}
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
    abilities: mergeClassAbilities((c.classAbilities ?? []).map(ability).filter(Boolean), c.name),
    mastered: withMastery(ability(c.masteredAbility), c.name),
  })
}
await writeFile('src/data/classes.json', JSON.stringify(classes, null, 2) + '\n')
console.log(
  `${characters.length} characters, ${Object.keys(skills).length} skills, ${Object.keys(spells).length} spells, ${paralogues.length} paralogues, ${growthClasses.length} classes with growths, ${classes.length} classes, ${mounts.length} mounts, ${battalions.length} battalions, ${baseStats.length} base stats`,
)
