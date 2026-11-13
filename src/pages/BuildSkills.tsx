import { useState } from 'react'
import { characters } from '../characters'
import { classes } from '../classes'
import { useI18n } from '../i18n'
import { equippables } from '../skillAbilities'

const MAX_EQUIPPED = 5
const UNIQUE_LEVEL = 35
// The source tags class abilities that grant a combat art with "[CA] ".
const isArt = (name: string) => name.startsWith('[CA] ')
const plain = (name: string) => (isArt(name) ? name.slice(5) : name)

type Props = { unitId: string; level: number; classId: string | undefined }

export default function BuildSkills({ unitId, level, classId }: Props) {
  const { t, skill, ability } = useI18n()
  const [equipped, setEquipped] = useState<string[]>([])
  const [q, setQ] = useState('')

  const unit = characters.find((c) => c.id === unitId)
  const cls = classes.find((c) => c.id === classId)
  const useUnique = level >= UNIQUE_LEVEL && (unit?.uniqueSkills.length ?? 0) > 0
  const personalIds = useUnique ? unit!.uniqueSkills : unit?.personalSkill ? [unit.personalSkill] : []
  const classNames = new Set((cls?.abilities ?? []).map((a) => a.name))

  const pool = equippables.filter((e) => !classNames.has(e.name))
  const chosen = equipped.filter((id) => pool.some((e) => e.id === id))
  const full = chosen.length >= MAX_EQUIPPED
  const toggle = (id: string) => setEquipped(chosen.includes(id) ? chosen.filter((x) => x !== id) : full ? chosen : [...chosen, id])
  const query = q.trim().toLowerCase()
  const shown = pool.filter((e) => plain(e.name).toLowerCase().includes(query))
  const label = (e: { name: string }) => <>{plain(e.name)}{isArt(e.name) && <> <span className="tag">{t.buildCombatArt}</span></>}</>
  const unlock = (e: (typeof pool)[number]) => (e.kind === 'mastery' ? `${t.buildClassUnlock}: ${e.unlock}` : e.unlock)

  return (
    <>
      <h3>{t.buildSkills}</h3>

      <h4>{t.buildPersonalTitle}</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>{t.buildSkill}</th><th>{t.buildDescription}</th><th>{t.buildUnlock}</th></tr>
          </thead>
          <tbody>
            {personalIds.length === 0 ? (
              <tr><td colSpan={3}>{t.noSkill}</td></tr>
            ) : (
              personalIds.map((id) => {
                const s = skill(id)
                return (
                  <tr key={id}>
                    <th scope="row">{s.name}</th>
                    <td>{s.description}</td>
                    <td>{t.buildLevelShort} {useUnique ? UNIQUE_LEVEL : 1}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <h4>{t.buildClassTitle}{cls ? ` — ${cls.name}` : ''}</h4>
      <p className="hint">{t.buildClassNote}</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>{t.buildSkill}</th><th>{t.buildDescription}</th></tr>
          </thead>
          <tbody>
            {!cls || cls.abilities.length === 0 ? (
              <tr><td colSpan={2}>{cls ? t.noSkill : t.buildNoClassYet}</td></tr>
            ) : (
              cls.abilities.map((a) => (
                <tr key={a.name}>
                  <th scope="row">{label(a)}</th>
                  <td>{ability(a.description)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h4>{t.buildEquipTitle} <small className="hint">({t.buildEquipped} {chosen.length}/{MAX_EQUIPPED})</small></h4>
      <p className="hint">{t.buildEquipNote}</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>{t.buildSkill}</th><th>{t.buildDescription}</th><th>{t.buildUnlock}</th><th></th></tr>
          </thead>
          <tbody>
            {Array.from({ length: MAX_EQUIPPED }, (_, i) => {
              const e = equippables.find((x) => x.id === chosen[i])
              return e ? (
                <tr key={e.id}>
                  <th scope="row">{label(e)}</th>
                  <td>{ability(e.description)}</td>
                  <td>{unlock(e)}</td>
                  <td><button type="button" className="chip" aria-label={`${t.buildRemove}: ${e.name}`} onClick={() => toggle(e.id)}>×</button></td>
                </tr>
              ) : (
                <tr key={`empty-${i}`}><td colSpan={4} className="hint">{t.buildNone}</td></tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <input className="search" type="search" value={q} placeholder={t.buildSearch} aria-label={t.buildSearch} onChange={(e) => setQ(e.target.value)} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th></th><th>{t.buildSkill}</th><th>{t.buildDescription}</th><th>{t.buildUnlock}</th></tr>
          </thead>
          <tbody>
            {shown.map((e) => {
              const on = chosen.includes(e.id)
              return (
                <tr key={e.id} className={on ? 'selected' : ''}>
                  <td>
                    <input type="checkbox" checked={on} disabled={!on && full} aria-label={e.name} onChange={() => toggle(e.id)} />
                  </td>
                  <th scope="row">{label(e)}</th>
                  <td>{ability(e.description)}</td>
                  <td>{unlock(e)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
