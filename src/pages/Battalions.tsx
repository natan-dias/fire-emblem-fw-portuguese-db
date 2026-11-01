import { useState } from 'react'
import { battalions } from '../battalions'
import { useI18n } from '../i18n'

export default function Battalions() {
  const { t } = useI18n()
  const [q, setQ] = useState('')
  const rows = battalions.filter((b) => b.name.toLowerCase().includes(q.trim().toLowerCase()))
  const bonuses = (b: (typeof battalions)[number]) =>
    Object.entries(b.stats)
      .filter(([, v]) => v)
      .map(([k, v]) => `${t.stats[k]} +${v}`)
      .join(', ')

  return (
    <>
      <h2>{t.growthBattalions}</h2>
      <input className="search" type="search" placeholder={t.searchBattalion} value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{t.battalion}</th>
              <th>{t.category}</th>
              <th>{t.rank}</th>
              <th>{t.gatherLimit}</th>
              <th>{t.battalionAbility}</th>
              <th>{t.statBonuses}</th>
              <th>{t.location}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id}>
                <th scope="row">{b.name}</th>
                <td>{t.battalionCategories[b.category] ?? b.category}</td>
                <td>{b.rank}</td>
                <td>{b.gatherLimit}</td>
                <td>{b.ability}</td>
                <td>{bonuses(b)}</td>
                <td>{b.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
