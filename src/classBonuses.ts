import data from './data/class-bonuses.json'
import type { Growths } from './types'

// Fixed stat points gained when a unit changes into a class (by English class name).
export const classBonuses = data as Record<string, Growths>
