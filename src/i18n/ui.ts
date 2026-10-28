import type { Lang } from '../types'

type Ui = {
  title: string
  subtitle: string
  home: string
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
  homeGoalTitle: string
  homeGoal: string
  homeFeaturesTitle: string
  homeCharacters: string
  homeRecruitment: string
  homeSpells: string
  disclaimerTitle: string
  disclaimer: string
  followMe: string
  homeImageAlt: string
  negotiationLevels: Record<string, string>
}

const ptBR: Ui = {
  title: "Fire Emblem Fortune's Weave",
  subtitle: 'Base de dados em português',
  home: 'Início',
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
  homeGoalTitle: 'Objetivo',
  homeGoal:
    'O principal objetivo deste projeto é ser um guia para os jogadores terem uma experiência melhor no jogo e ajudá-los a planejar suas rotas.',
  homeFeaturesTitle: 'O que você encontra aqui',
  homeCharacters:
    'todos os personagens, com suas habilidades pessoais e as habilidades únicas, base e "+" juntas (nomes originais em inglês, descrições em português).',
  homeRecruitment: 'uma tabela mostrando como recrutar cada personagem em cada rota.',
  homeSpells:
    'White Magic Spells (Faith) e Black Magic Spells (Reason), com as magias que cada personagem aprende por rank (D–S), busca por personagem e uma tabela com a descrição completa de cada magia.',
  disclaimerTitle: 'Aviso',
  disclaimer:
    "Este é um projeto de fãs, não oficial, e não é afiliado, patrocinado ou endossado pelos criadores de Fire Emblem: Fortune's Weave nem pelos detentores dos direitos da série Fire Emblem. Nomes, personagens, imagens e demais materiais do jogo pertencem aos seus respectivos donos.",
  followMe: 'Gostou do site? Siga meu canal no YouTube:',
  homeImageAlt: "Tela de título de Fire Emblem: Fortune's Weave",
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
