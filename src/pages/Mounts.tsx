import { mounts } from '../mounts'
import { useI18n } from '../i18n'
import type { Growths } from '../types'

// Grouped by type (in order of first appearance); source order is kept within each type.
const typeOrder = [...new Set(mounts.map((m) => m.type))]
const sorted = [...mounts].sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type))

export default function Mounts() {
  const { t, mountEffect, mountLocation } = useI18n()
  const list = (g: Growths, signed: boolean) =>
    Object.entries(g)
      .filter(([, v]) => v)
      .map(([k, v]) => `${t.stats[k]} ${signed ? '+' : ''}${v}${signed ? '' : '%'}`)
      .join(', ')

  return (
    <>
      <h2>{t.growthMounts}</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{t.mount}</th>
              <th>{t.mountType}</th>
              <th>{t.statBonuses}</th>
              <th>{t.growthRates}</th>
              <th>{t.mountAbilities}</th>
              <th>{t.location}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m) => (
              <tr key={m.id}>
                <th scope="row">{m.name}</th>
                <td>{t.mountTypes[m.type] ?? m.type}</td>
                <td>{list(m.stats, true) || t.notRecruitable}</td>
                <td>{list(m.growths, false) || t.notRecruitable}</td>
                <td>
                  {m.abilities.map((a, i) => (
                    <div key={i}>
                      {a.name}: {a.effect ? mountEffect(a.effect) : t.notRecruitable}
                    </div>
                  ))}
                </td>
                <td>{mountLocation(m.location)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
