import { useState } from 'react'
import { classes } from '../classes'
import { useI18n } from '../i18n'
import type { StatKey } from '../types'

export const classTiers = ['Base', 'Beginner', 'Specialty', 'Advanced', 'Master', 'Divine']
const stats: StatKey[] = ['hp', 'str', 'mag', 'spd', 'dex', 'def', 'res', 'lck', 'cha']

export default function Classes({ tier }: { tier: string }) {
  const { t, ability } = useI18n()
  const [q, setQ] = useState('')
  const list = classes.filter((c) => c.tier === tier && c.name.toLowerCase().includes(q.trim().toLowerCase()))
  // Proficiency names stay in English, as in the game.
  const prof = (id: string) => t.profs[id] ?? id[0].toUpperCase() + id.slice(1)
  const sign = (n: number) => (n > 0 ? `+${n}` : `−${-n}`)

  return (
    <>
      <h2>{tier}</h2>
      <input className="search" type="search" placeholder={t.searchClass} value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="grid class-grid">
        {list.map((c) => (
          <article key={c.id} className="card class-card">
            <img className="portrait" src={`${import.meta.env.BASE_URL}portraits/classes/${c.portrait}`} alt={c.name} loading="lazy" />
            <h2>{c.name}</h2>
            <p>
              <strong>{t.movement}:</strong> {t.moves[c.movement] ?? c.movement}
              {c.mount && ` (${t.mount}: ${c.mount})`}
            </p>
            <p><strong>{t.proficiencies}:</strong> {c.proficiencies.map(prof).join(', ')}</p>
            {c.skills.length > 0 && (
              <p><strong>{t.skillGrades}:</strong> {c.skills.map((s) => `${prof(s.type)} ${s.grade}`).join(', ')}</p>
            )}
            {c.bonusExp.length > 0 && <p><strong>{t.bonusExp}:</strong> {c.bonusExp.map(prof).join(', ')}</p>}
            {stats.some((k) => c.growths[k]) && (
              <p>
                <strong>{t.growth}:</strong>{' '}
                {stats.filter((k) => c.growths[k]).map((k) => `${t.stats[k]} ${sign(c.growths[k]!)}`).join(', ')}
              </p>
            )}
            {c.abilities.length > 0 && (
              <>
                <h3>{t.classAbilities}</h3>
                <ul>
                  {c.abilities.map((a) => (
                    <li key={a.name}><strong>{a.name}</strong>{a.description && `: ${ability(a.description)}`}</li>
                  ))}
                </ul>
              </>
            )}
            {c.mastered && tier !== 'Base' && (
              <>
                <h3>{t.masterAbility}</h3>
                <p><strong>{c.mastered.name}</strong>{c.mastered.description && `: ${ability(c.mastered.description)}`}</p>
              </>
            )}
          </article>
        ))}
      </div>
    </>
  )
}
