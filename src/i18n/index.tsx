import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang } from '../types'
import { ui, type Ui } from './ui'
import skillsEn from '../data/skills.json'
import skillsBR from './skills.pt-BR.json'
import skillsPT from './skills.pt-PT.json'

const skillText: Record<Lang, Record<string, string>> = {
  'pt-BR': skillsBR,
  'pt-PT': { ...skillsBR, ...skillsPT }, // pt-PT only needs overrides
}

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Ui
  skill: (id: string) => { name: string; description: string }
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
