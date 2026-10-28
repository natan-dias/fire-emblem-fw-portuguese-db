import type { Lang } from '../types'

type Ui = {
  title: string
  subtitle: string
  characters: string
  recruitment: string
  spells: string
  whiteMagic: string
  blackMagic: string
  spellsHint: string
  spell: string
  power: string
  hit: string
  range: string
  weight: string
  crit: string
  avoid: string
  uses: string
  effect: string
  search: string
  language: string
  personal: string
  unique: string
  noSkill: string
  character: string
  support: string
  renown: string
  paralogue: string
  requirement: string
  negotiation: string
  startingUnit: string
  notRecruitable: string
  credit: string
  negotiationLevels: Record<string, string>
}

const ptBR: Ui = {
  title: "Fire Emblem Fortune's Weave",
  subtitle: 'Base de dados em português',
  characters: 'Personagens',
  recruitment: 'Recrutamento',
  spells: 'Magias',
  whiteMagic: 'White Magic Spells',
  blackMagic: 'Black Magic Spells',
  spellsHint: 'Descrição completa das magias abaixo na página',
  spell: 'Magia (Spell)',
  power: 'Poder (Mt)',
  hit: 'Acerto (Hit)',
  range: 'Alcance (Rng)',
  weight: 'Peso (Wt)',
  crit: 'Crítico (Crit)',
  avoid: 'Esquiva (Avo)',
  uses: 'Usos (Uses)',
  effect: 'Efeito (Effect)',
  search: 'Buscar personagem…',
  language: 'Idioma',
  personal: 'Habilidade pessoal',
  unique: 'Habilidade Única',
  noSkill: '—',
  character: 'Personagem',
  support: 'Apoio',
  renown: 'Renome',
  paralogue: 'Paralogue',
  requirement: 'Requisito',
  negotiation: 'Negociação',
  startingUnit: 'Unidade inicial',
  notRecruitable: '—',
  credit: 'Dados e imagens baseados em',
  negotiationLevels: { Easy: 'Fácil', Moderate: 'Moderada', Difficult: 'Difícil' },
}

const ptPT: Ui = {
  ...ptBR,
  search: 'Procurar personagem…',
  credit: 'Dados e imagens baseados em',
  negotiationLevels: { Easy: 'Fácil', Moderate: 'Moderada', Difficult: 'Difícil' },
}

export const ui: Record<Lang, Ui> = { 'pt-BR': ptBR, 'pt-PT': ptPT }
export type { Ui }
