export type Lang = 'pt-BR' | 'pt-PT'

export type Rank = 'D' | 'D+' | 'C' | 'C+' | 'B' | 'B+' | 'A' | 'A+' | 'S'

export type ArtProf = 'sword' | 'lance' | 'axe' | 'bow' | 'brawl' | 'authority' | 'infantry' | 'riding' | 'armor' | 'flying'

export type Condition = {
  support?: number
  renown?: number
  paralogue?: string
  requirement?: string
  negotiation?: string
  extra?: string
}

export type Paralogue = {
  id: string
  name: string
  windows: Partial<Record<'cai' | 'dietrich' | 'theodora' | 'leda', { start: string; end: string }[]>>
}

export type Character = {
  id: string
  name: string
  portrait: string
  personalSkill: string | null
  uniqueSkills: string[]
  whiteSpells: Partial<Record<Rank, string[]>>
  blackSpells: Partial<Record<Rank, string[]>>
  arts: Record<ArtProf, Partial<Record<string, string[]>>>
  recruitment: Partial<Record<'cai' | 'dietrich' | 'theodora' | 'leda', Condition>>
}

export type StatKey = 'hp' | 'str' | 'mag' | 'spd' | 'dex' | 'def' | 'res' | 'lck' | 'cha'

export type Growths = Partial<Record<StatKey, number>>

export type ClassGrowth = {
  id: string
  name: string
  tier: string
  growths: Growths
  tiers?: { level: number; growths: Growths }[]
}

export type ClassAbility = { name: string; description: string }

export type ClassInfo = {
  id: string
  name: string
  tier: string
  portrait: string
  movement: string
  mount: string | null
  proficiencies: string[]
  skills: { type: string; grade: string }[]
  bonusExp: string[]
  growths: Growths
  abilities: ClassAbility[]
  mastered: ClassAbility | null
}
