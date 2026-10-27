export type Lang = 'pt-BR' | 'pt-PT'

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
  recruitment: Partial<Record<'cai' | 'dietrich' | 'theodora' | 'leda', Condition>>
}
