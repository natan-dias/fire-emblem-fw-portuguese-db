import type { Lang } from '../types'

type Ui = {
  title: string
  characters: string
  recruitment: string
  search: string
  language: string
  personal: string
  level35: string
  level35Plus: string
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
  title: 'Fortune’s Weave — Base de Dados',
  characters: 'Personagens',
  recruitment: 'Recrutamento',
  search: 'Buscar personagem…',
  language: 'Idioma',
  personal: 'Habilidade pessoal',
  level35: 'Habilidade de nível 35',
  level35Plus: 'Habilidade de nível 35 (versão mais forte)',
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
