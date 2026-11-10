import type { Lang } from '../types'

type Ui = {
  title: string
  subtitle: string
  home: string
  characters: string
  recruitment: string
  paralogues: string
  spells: string
  whiteMagic: string
  blackMagic: string
  spellsHint: string
  combatArts: string
  artsHint: string
  art: string
  cost: string
  might: string
  profs: Record<string, string>
  growth: string
  classes: string
  homeClasses: string
  movement: string
  moves: Record<string, string>
  mount: string
  proficiencies: string
  skillGrades: string
  bonusExp: string
  classAbilities: string
  masterAbility: string
  growthUnits: string
  growthClasses: string
  growthMounts: string
  growthBattalions: string
  searchBattalion: string
  mountType: string
  mountTypes: Record<string, string>
  statBonuses: string
  growthRates: string
  mountAbilities: string
  location: string
  battalion: string
  category: string
  battalionCategories: Record<string, string>
  rank: string
  gatherLimit: string
  battalionAbility: string
  searchClass: string
  class: string
  tier: string
  total: string
  stats: Record<string, string>
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
  noResults: string
  language: string
  menu: string
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
  homeParalogues: string
  homeSpells: string
  homeArts: string
  homeGrowth: string
  simulator: string
  homeSimulator: string
  simNoClass: string
  simClass: string
  simBase: string
  simMod: string
  simFinal: string
  simLevelNote: string
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
  paralogues: 'Paralogues',
  spells: 'Magias',
  whiteMagic: 'White Magic Spells',
  blackMagic: 'Black Magic Spells',
  spellsHint: 'Descrição completa das magias abaixo na página',
  combatArts: 'Artes de Combate',
  artsHint: 'Descrição completa das artes abaixo na página',
  art: 'Arte (Art)',
  cost: 'Custo (Cost)',
  might: 'Poder (Mt)',
  profs: {
    sword: 'Sword', lance: 'Lance', axe: 'Axe', bow: 'Bow', brawl: 'Brawl',
    authority: 'Authority', infantry: 'Infantry', riding: 'Riding', armor: 'Armor', flying: 'Flying',
  },
  growth: 'Crescimento',
  classes: 'Classes',
  homeClasses:
    'Um submenu por tier (Base, Beginner, Specialty, Advanced, Master e Divine), com uma caixa por classe: movimento, proficiências, crescimento, Class Abilities e Master Ability, com busca por nome.',
  movement: 'Movimento',
  moves: { infantry: 'Infantaria', cavalry: 'Cavalaria', flying: 'Voador', armored: 'Blindado' },
  mount: 'Montaria',
  proficiencies: 'Proficiências',
  skillGrades: 'Rank inicial',
  bonusExp: 'EXP bônus',
  classAbilities: 'Class Abilities',
  masterAbility: 'Master Ability',
  growthUnits: 'Unidades',
  growthClasses: 'Classes',
  growthMounts: 'Montarias',
  growthBattalions: 'Batalhões',
  searchBattalion: 'Buscar batalhão…',
  mountType: 'Tipo',
  mountTypes: { Horse: 'Cavalo', Ornius: 'Ornius', Pegasus: 'Pégaso', Bau: 'Bau', Elephant: 'Elefante' },
  statBonuses: 'Bônus de status',
  growthRates: 'Crescimento',
  mountAbilities: 'Habilidades',
  location: 'Local',
  battalion: 'Batalhão',
  category: 'Categoria',
  battalionCategories: { Defense: 'Defesa', Magical: 'Mágico', Physical: 'Físico', Support: 'Apoio' },
  rank: 'Rank',
  gatherLimit: 'Limite de reunião',
  battalionAbility: 'Habilidade',
  searchClass: 'Buscar classe…',
  class: 'Classe (Class)',
  tier: 'Tier',
  total: 'Total',
  stats: {
    hp: 'HP', str: 'Str', mag: 'Mag', spd: 'Spd', dex: 'Dex', def: 'Def', res: 'Res', lck: 'Lck', cha: 'Cha',
  },
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
  noResults: 'Nenhum resultado. Tente outro nome.',
  language: 'Idioma',
  menu: 'Menu',
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
  homeParalogues:
    'uma tabela com as datas em que cada paralogue fica disponível em cada rota (mês/dia do calendário do jogo).',
  homeSpells:
    'White Magic Spells (Faith) e Black Magic Spells (Reason), com as magias que cada personagem aprende por rank (D–S), busca por personagem e uma tabela com a descrição completa de cada magia.',
  homeArts:
    'Sword, Lance, Axe, Bow, Brawl, Authority, Infantry, Riding, Armor e Flying, com o que cada personagem aprende por rank, busca por personagem e, nas armas, uma tabela com a descrição completa de cada arte de combate.',
  homeGrowth:
    'Unidades e Classes, com as taxas de crescimento (%) de cada personagem e os modificadores de crescimento de cada classe, com busca por nome; Montarias, com bônus de status, crescimento, habilidades e local de cada montaria; e Batalhões, com categoria, rank, habilidade, bônus de status e local de cada batalhão, com busca por nome.',
  simulator: 'Simulador',
  homeSimulator:
    'escolha um personagem e uma classe (separadas por tier) e veja como ficam as taxas de crescimento: base do personagem + modificador da classe.',
  simNoClass: 'Sem classe',
  simClass: 'Classe',
  simBase: 'Base do personagem',
  simMod: 'Modificador da classe',
  simFinal: 'Crescimento final',
  simLevelNote: 'Esta classe tem crescimentos por nível (veja Crescimento/Classes); eles não entram na simulação.',
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
  searchClass: 'Procurar classe…',
  searchBattalion: 'Procurar batalhão…',
  credit: 'Dados e imagens baseados em',
  negotiationLevels: { Easy: 'Fácil', Moderate: 'Moderada', Difficult: 'Difícil' },
}

export const ui: Record<Lang, Ui> = { 'pt-BR': ptBR, 'pt-PT': ptPT }
export type { Ui }
