export type Lang = 'pt-BR' | 'pt-PT'

export type Rank = 'D' | 'C' | 'B' | 'A' | 'S'

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
  personalSkill: string
  uniqueSkills: string[]
  whiteSpells: Partial<Record<Rank, string[]>>
  blackSpells: Partial<Record<Rank, string[]>>
  recruitment: Partial<Record<'cai' | 'dietrich' | 'theodora' | 'leda', Condition>>
}
