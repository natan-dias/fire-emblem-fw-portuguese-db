import { useState } from 'react'
import { characters } from '../characters'
import { useI18n } from '../i18n'
import type { Condition } from '../types'

const lords = [
  ['cai', 'Cai'],
  ['dietrich', 'Dietrich'],
  ['theodora', 'Theodora'],
  ['leda', 'Leda'],
] as const

export default function Recruitment() {
  const { t, condition } = useI18n()
  const [q, setQ] = useState('')
  const list = characters.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()))

  const describe = (c: Condition) => {
    if (c.extra) return [c.extra === 'Starting unit' ? t.startingUnit : condition(c.extra)]
    const lines: string[] = []
    if (c.support != null) lines.push(`${t.support} ${c.support}`)
    if (c.renown != null) lines.push(`${t.renown} ${c.renown}`)
    if (c.paralogue) lines.push(`${t.paralogue}: ${c.paralogue}`)
    if (c.negotiation) lines.push(`${t.negotiation}: ${t.negotiationLevels[c.negotiation] ?? c.negotiation}`)
    if (c.requirement) lines.push(`${t.requirement}: ${condition(c.requirement)}`)
    return lines
  }

  return (
    <>
      <input className="search" type="search" placeholder={t.search} value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{t.character}</th>
              {lords.map(([id, name]) => (
                <th key={id}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id}>
                <th scope="row">{c.name}</th>
                {lords.map(([id]) => {
                  const cond = c.recruitment[id]
                  return (
                    <td key={id}>
                      {!cond ? t.notRecruitable : describe(cond).map((l) => <div key={l}>{l}</div>)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
