import { useState } from 'react'
import { characters } from '../characters'
import { useI18n } from '../i18n'
import spellData from '../data/spells.json'
import type { Rank } from '../types'

const ranks: Rank[] = ['D', 'C', 'B', 'A', 'S']

export default function Spells({ kind }: { kind: 'white' | 'black' }) {
  const { t, spell } = useI18n()
  const [q, setQ] = useState('')
  const list = characters.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()))
  const learned = (c: (typeof characters)[number]) => (kind === 'white' ? c.whiteSpells : c.blackSpells)
  const all = Object.entries(spellData).filter(([, s]) => s.kind === kind)
  const num = (n: number | null) => n ?? t.noSkill

  return (
    <>
      <h2>{kind === 'white' ? t.whiteMagic : t.blackMagic}</h2>
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
                  <td key={r}>
                    {learned(c)[r]?.map((id) => <div key={id}>{spell(id).name}</div>) ?? t.noSkill}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-wrap spell-details">
        <table>
          <thead>
            <tr>
              <th>{t.spell}</th>
              <th>{t.power}</th>
              <th>{t.hit}</th>
              <th>{t.range}</th>
              <th>{t.weight}</th>
              <th>{t.crit}</th>
              <th>{t.avoid}</th>
              <th>{t.uses}</th>
              <th>{t.effect}</th>
            </tr>
          </thead>
          <tbody>
            {all.map(([id, s]) => (
              <tr key={id}>
                <th scope="row">{s.name}</th>
                <td>{num(s.power)}</td>
                <td>{num(s.hit)}</td>
                <td>{s.range}</td>
                <td>{num(s.weight)}</td>
                <td>{num(s.crit)}</td>
                <td>{num(s.avo)}</td>
                <td>{num(s.uses)}</td>
                <td>{spell(id).effect || t.noSkill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
