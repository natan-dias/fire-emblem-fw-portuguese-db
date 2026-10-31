import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang } from '../types'
import { ui, type Ui } from './ui'
import skillsEn from '../data/skills.json'
import skillsBR from './skills.pt-BR.json'
import skillsPT from './skills.pt-PT.json'
import spellsEn from '../data/spells.json'
import spellsBR from './spells.pt-BR.json'
import spellsPT from './spells.pt-PT.json'
import artsData from '../data/arts.json'
import artsBR from './arts.pt-BR.json'
import artsPT from './arts.pt-PT.json'
import abilitiesBR from './class-abilities.pt-BR.json'
import abilitiesPT from './class-abilities.pt-PT.json'

const skillText: Record<Lang, Record<string, string>> = {
  'pt-BR': skillsBR,
  'pt-PT': { ...skillsBR, ...skillsPT }, // pt-PT only needs overrides
}

const spellText: Record<Lang, Record<string, string>> = {
  'pt-BR': spellsBR,
  'pt-PT': { ...spellsBR, ...spellsPT },
}

const artText: Record<Lang, Record<string, string>> = {
  'pt-BR': artsBR,
  'pt-PT': { ...artsBR, ...artsPT },
}

const abilityText: Record<Lang, Record<string, string>> = {
  'pt-BR': abilitiesBR,
  'pt-PT': { ...abilitiesBR, ...abilitiesPT },
}

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Ui
  skill: (id: string) => { name: string; description: string }
  spell: (id: string) => { name: string; effect: string }
  art: (id: string) => { name: string; effect: string }
  skillName: (id: string) => string
  ability: (description: string) => string
  condition: (value: string) => string
}

const I18n = createContext<Ctx | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

// Requirement strings come from the source data in English; item names stay as in the game.
const requirementRules: [RegExp, string][] = [
  [/^Answer: /, 'Resposta: '],
  [/^(\d+) Quests$/, '$1 Missões'],
  [/^Quest$/, 'Missão'],
  [/^Yes x(\d+)$/, 'Sim x$1'],
  [/^Ask him (\d+) times$/, 'Pergunte $1 vezes'],
  [/^(.+)'s team has lost$/, 'A equipe de $1 foi derrotada'],
  [/^Complete \?\?\?$/, 'Complete ???'],
]

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => load('lang', 'pt-BR'))

  useEffect(() => {
    save('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const value: Ctx = {
    lang,
    setLang,
    t: ui[lang],
    skill: (id) => ({
      name: skillsEn[id as keyof typeof skillsEn].name,
      description: skillText[lang][id],
    }),
    spell: (id) => ({
      name: spellsEn[id as keyof typeof spellsEn].name,
      effect: spellText[lang][id] ?? '',
    }),
    art: (id) => ({
      name: artsData.arts[id as keyof typeof artsData.arts].name,
      effect: artText[lang][id] ?? '',
    }),
    skillName: (id) => artsData.skillNames[id as keyof typeof artsData.skillNames] ?? id,
    ability: (d) => abilityText[lang][d] ?? d,
    condition: (v) =>
      v
        .split(', ')
        .map((part) => requirementRules.reduce((s, [re, to]) => s.replace(re, to), part))
        .join(', '),
  }
  return <I18n.Provider value={value}>{children}</I18n.Provider>
}

export const useI18n = () => {
  const ctx = useContext(I18n)
  if (!ctx) throw new Error('useI18n outside provider')
  return ctx
}
