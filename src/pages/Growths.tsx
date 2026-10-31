import { useState } from 'react'
import { characters } from '../characters'
import { classGrowths, unitGrowths } from '../growths'
import { useI18n } from '../i18n'
import type { Growths as GrowthMap, StatKey } from '../types'

const stats: StatKey[] = ['hp', 'str', 'mag', 'spd', 'dex', 'def', 'res', 'lck', 'cha']
const total = (g: GrowthMap) => stats.reduce((sum, k) => sum + (g[k] ?? 0), 0)

export default function Growths({ kind }: { kind: 'units' | 'classes' }) {
  const { t } = useI18n()
  const [q, setQ] = useState('')
  const match = (name: string) => name.toLowerCase().includes(q.trim().toLowerCase())
  const isUnits = kind === 'units'
  // Class growths are modifiers, so they show a sign.
  const fmt = (n: number | undefined) => (isUnits ? String(n ?? 0) : n ? (n > 0 ? `+${n}` : `−${-n}`) : '0')

  const rows = isUnits
    ? unitGrowths.flatMap((u) => {
        const name = characters.find((c) => c.id === u.id)?.name ?? u.id
        return match(name) ? [{ key: u.id, name, tier: '', growths: u.growths }] : []
      })
    : classGrowths.flatMap((c) =>
        [
          { key: c.id, name: c.name, growths: c.growths },
          ...(c.tiers ?? []).map((x) => ({ key: `${c.id}@${x.level}`, name: `${c.name} (Lv. ${x.level})`, growths: x.growths })),
        ]
          .filter((r) => match(r.name))
          .map((r) => ({ ...r, tier: c.tier })),
      )

  return (
    <>
      <h2>{isUnits ? t.growthUnits : t.growthClasses}</h2>
      <input className="search" type="search" placeholder={isUnits ? t.search : t.searchClass} value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{isUnits ? t.character : t.class}</th>
              {!isUnits && <th>{t.tier}</th>}
              {stats.map((k) => (
                <th key={k}>{t.stats[k]}</th>
              ))}
              <th>{t.total}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <th scope="row">{r.name}</th>
                {!isUnits && <td>{r.tier}</td>}
                {stats.map((k) => (
                  <td key={k}>{fmt(r.growths[k])}</td>
                ))}
                <td>{fmt(total(r.growths))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
