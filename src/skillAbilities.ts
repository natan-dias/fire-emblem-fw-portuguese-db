import data from './data/skill-abilities.json'
import { classes } from './classes'
import type { ClassAbility } from './types'

export type Equippable = ClassAbility & { id: string; kind: 'skill' | 'mastery'; unlock: string }

// Mastery combat arts that the Fire Emblem Wiki list does not have; kept out of the equippable pool.
const excluded = new Set(['[CA] Astra', '[CA] Strike and Heal', "[CA] Hunter's Cross", '[CA] Song of Calm', '[CA] Song of Courage'])

// Equippable pool: Skill Rank abilities (wiki) + Class Mastery abilities (non-Divine classes, one entry per ability).
const mastery = new Map<string, Equippable>()
for (const c of classes) {
  if (c.tier === 'Divine' || !c.mastered?.name || excluded.has(c.mastered.name)) continue
  const id = `mastery:${c.mastered.name}`
  const prev = mastery.get(id)
  mastery.set(id, { ...c.mastered, id, kind: 'mastery', unlock: prev ? `${prev.unlock}, ${c.name}` : c.name })
}

export const equippables: Equippable[] = [
  ...data.map((s) => ({ ...s, id: `skill:${s.name}`, kind: 'skill' as const })),
  ...mastery.values(),
]
