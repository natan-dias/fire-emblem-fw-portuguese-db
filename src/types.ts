export type Lang = 'pt-BR' | 'pt-PT'

export type Rank = 'D' | 'D+' | 'C' | 'C+' | 'B' | 'B+' | 'A' | 'A+' | 'S'

export type Condition = {
  support?: number
  renown?: number
  paralogue?: string
  requirement?: string
  negotiation?: string
  extra?: string
}

export type Character = {
  id: string
  name: string
  portrait: string
  personalSkill: string | null
  uniqueSkills: string[]
  whiteSpells: Partial<Record<Rank, string[]>>
  blackSpells: Partial<Record<Rank, string[]>>
  recruitment: Partial<Record<'cai' | 'dietrich' | 'theodora' | 'leda', Condition>>
}
