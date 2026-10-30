import { useState } from 'react'
import { characters } from '../characters'
import { useI18n } from '../i18n'
import artsData from '../data/arts.json'
import type { ArtProf } from '../types'

export const artProfs: ArtProf[] = ['sword', 'lance', 'axe', 'bow', 'brawl', 'authority', 'infantry', 'riding', 'armor', 'flying']
export const weaponProfs: ArtProf[] = ['sword', 'lance', 'axe', 'bow', 'brawl']

const rankOrder = ['D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S', 'S+']

export default function CombatArts({ prof }: { prof: ArtProf }) {
  const { t, art, skillName } = useI18n()
  const [q, setQ] = useState('')
  const list = characters.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()))
  const weapon = weaponProfs.includes(prof)
  const ranks = rankOrder.filter((r) => characters.some((c) => c.arts[prof][r]))
  const all = Object.entries(artsData.arts).filter(([, a]) => a.prof === prof)
  const num = (n: number | null) => n ?? t.noSkill
  const label = (id: string) => (weapon ? art(id).name : skillName(id))

  return (
    <>
      <h2>{t.profs[prof]}</h2>
      <input className="search" type="search" placeholder={t.search} value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{t.character}</th>
              {ranks.map((r) => (
                <th key={r}>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id}>
                <th scope="row">{c.name}</th>
                {ranks.map((r) => (
                  <td key={r}>{c.arts[prof][r]?.map((id) => <div key={id}>{label(id)}</div>) ?? t.noSkill}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {weapon && (
        <div className="table-wrap spell-details">
          <table>
            <thead>
              <tr>
                <th>{t.art}</th>
                <th>{t.cost}</th>
                <th>{t.might}</th>
                <th>{t.hit}</th>
                <th>{t.crit}</th>
                <th>{t.range}</th>
                <th>{t.effect}</th>
              </tr>
            </thead>
            <tbody>
              {all.map(([id, a]) => (
                <tr key={id}>
                  <th scope="row">{a.name}</th>
                  <td>{num(a.cost)}</td>
                  <td>{num(a.might)}</td>
                  <td>{num(a.hit)}</td>
                  <td>{num(a.crit)}</td>
                  <td>{a.range}</td>
                  <td>{art(id).effect || t.noSkill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
