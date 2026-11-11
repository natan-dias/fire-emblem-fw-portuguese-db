import data from './data/base-stats.json'
import type { Growths } from './types'

export type BaseStat = { id: string; level1: Required<Growths>; beginner: string; specialty: string }

export const baseStats = data as BaseStat[]

// Join at a fixed level (no growth penalty): the autolevel gains the full growth rate as stat exp.
export const fixedLevelJoiners = ['ultand', 'mikaela', 'lilian', 'lysander', 'olympia']
