import type { StatKey } from './types'

// Tie-break order when forcing stat increases.
const order: StatKey[] = ['hp', 'str', 'mag', 'dex', 'spd', 'lck', 'def', 'res', 'cha']
type Stats = Record<StatKey, number>

// Class used by a level-up to level n (null = personal growth only).
export const tierAt = (level: number) =>
  level < 5 ? null : level < 20 ? 'beginner' : level < 35 ? 'specialty' : level < 45 ? 'advanced' : 'master'

// Returns the stats after each level: result[L] = stats at level L (result[1] = base).
// `rates(level)` gives the growth rates (already floored at 0) used by the level-up to `level`.
// Levels up to `entry` use the autolevel (recruits catching up); levels above it add plain average growth (rate / 100).
// Stat exp is kept in tenths (gain = 0.8 x rate - 1 -> 8 x rate - 10; need 1000 for +1), so it stays exact.
export function autolevel(base: Stats, rates: (level: number) => Stats, to: number, entry: number, fixedLevel: boolean): Stats[] {
  const result: Stats[] = [undefined as unknown as Stats, { ...base }]
  const exp = Object.fromEntries(order.map((k) => [k, 0])) as Stats
  for (let level = 2; level <= to; level++) {
    const next = { ...result[level - 1] }
    const r = rates(level)
    if (level > entry) {
      for (const k of order) next[k] = Math.round((next[k] + r[k] / 100) * 100) / 100
      result.push(next)
      continue
    }
    let gained = 0
    for (const k of order) {
      exp[k] += fixedLevel ? 10 * r[k] : 8 * r[k] - 10
      if (exp[k] >= 1000) {
        exp[k] -= 1000
        next[k]++
        gained++
      }
    }
    while (gained < 2) {
      // A stat rises at most +1 per level, so stats that already rose this level are skipped.
      const open = order.filter((x) => next[x] === result[level - 1][x])
      const k = open.reduce((best, x) => (exp[x] > exp[best] ? x : best))
      next[k]++
      exp[k] = 0
      gained++
    }
    result.push(next)
  }
  return result
}
