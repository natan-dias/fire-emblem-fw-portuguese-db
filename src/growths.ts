import data from './data/growths.json'
import type { ClassGrowth, Growths } from './types'

export const unitGrowths = data.units as { id: string; growths: Growths }[]
export const classGrowths = data.classes as ClassGrowth[]
