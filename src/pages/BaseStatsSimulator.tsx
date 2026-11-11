import { useState } from 'react'
import { autolevel, tierAt } from '../autolevel'
import { baseStats, fixedLevelJoiners } from '../baseStats'
import { characters } from '../characters'
import { classGrowths, unitGrowths } from '../growths'
import { useI18n } from '../i18n'
import type { Growths, StatKey } from '../types'

const stats: StatKey[] = ['hp', 'str', 'mag', 'spd', 'dex', 'def', 'res', 'lck', 'cha']
const total = (g: Growths) => stats.reduce((sum, k) => sum + (g[k] ?? 0), 0)
const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : '0')
// Rounded once at display time (.5 and above rounds up).
const round = (s: Record<StatKey, number>) => Object.fromEntries(stats.map((k) => [k, Math.round(s[k])])) as Record<StatKey, number>
const MAX_LEVEL = 99
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(n) || min))

const units = baseStats
  .map((b) => ({ ...b, name: characters.find((c) => c.id === b.id)?.name ?? b.id }))
  .sort((a, b) => a.name.localeCompare(b.name))
const byName = (name: string) => classGrowths.find((c) => c.name === name)
const beginnerClasses = classGrowths.filter((c) => c.tier === 'Beginner')
const specialtyClasses = classGrowths.filter((c) => c.tier === 'Specialty')
const advancedClasses = classGrowths.filter((c) => c.tier === 'Advanced')
const masterClasses = classGrowths.filter((c) => c.tier === 'Master')

export default function BaseStatsSimulator() {
  const { t } = useI18n()
  const [unitId, setUnitId] = useState(units[0]?.id ?? '')
  const [entry, setEntry] = useState(1)
  const [target, setTarget] = useState(20)
  const [beginnerId, setBeginnerId] = useState('')
  const [specialtyId, setSpecialtyId] = useState('')
  const [advancedId, setAdvancedId] = useState('')
  const [masterId, setMasterId] = useState('')

  const unit = units.find((u) => u.id === unitId)
  if (!unit) return null
  const personal = unitGrowths.find((u) => u.id === unit.id)?.growths ?? {}
  const level = Math.max(target, entry)
  const mods = {
    beginner: classGrowths.find((c) => c.id === beginnerId)?.growths ?? byName(unit.beginner)?.growths ?? {},
    specialty: classGrowths.find((c) => c.id === specialtyId)?.growths ?? byName(unit.specialty)?.growths ?? {},
    advanced: classGrowths.find((c) => c.id === advancedId)?.growths ?? {},
    master: classGrowths.find((c) => c.id === masterId)?.growths ?? {},
  }
  const rates = (lv: number) => {
    const tier = tierAt(lv)
    const mod: Growths = tier ? mods[tier] : {}
    return Object.fromEntries(stats.map((k) => [k, Math.max(0, (personal[k] ?? 0) + (mod[k] ?? 0))])) as Record<StatKey, number>
  }
  const path = autolevel(unit.level1, rates, level, entry, fixedLevelJoiners.includes(unit.id))
  const start = round(path[1])
  const atEntry = round(path[entry])
  const final = round(path[level])

  const setEntryLevel = (n: number) => {
    const e = clamp(n, 1, MAX_LEVEL)
    setEntry(e)
    if (target < e) setTarget(e)
  }
  const setTargetLevel = (n: number) => setTarget(clamp(n, entry, MAX_LEVEL))

  // `defaultName` set = class is always required: no "Sem classe" chip; '' selects the sheet's class.
  const picker = (label: string, minLevel: number, list: typeof advancedClasses, value: string, set: (id: string) => void, defaultName?: string) => {
    const locked = level < minLevel
    const current = defaultName ? (list.find((c) => c.id === value) ?? byName(defaultName))?.id : value
    return (
      <>
        <h3>{label} <small className="hint">({t.simFromLevel} {minLevel})</small></h3>
        <nav className="subnav" aria-disabled={locked}>
          {!defaultName && (
            <button type="button" disabled={locked} aria-pressed={value === ''} className={value === '' ? 'active' : ''} onClick={() => set('')}>{t.simNoClass}</button>
          )}
          {list.map((c) => (
            <button key={c.id} type="button" disabled={locked} aria-pressed={c.id === current} className={c.id === current ? 'active' : ''} onClick={() => set(c.id)}>
              {c.name}{c.name === defaultName ? ` (${t.simDefault})` : ''}
            </button>
          ))}
        </nav>
      </>
    )
  }

  return (
    <>
      <label className="sim-controls">
        {t.character}
        <select value={unitId} onChange={(e) => { setUnitId(e.target.value); setBeginnerId(''); setSpecialtyId('') }}>
          {units.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </label>
      <div className="sim-levels">
        <label className="sim-controls">
          {t.simEntryLevel}
          <input type="number" inputMode="numeric" min={1} max={MAX_LEVEL} value={entry} onChange={(e) => setEntryLevel(Number(e.target.value))} />
        </label>
        <label className="sim-controls">
          {t.simTargetLevel}: {level}
          <input type="range" min={entry} max={MAX_LEVEL} value={level} onChange={(e) => setTargetLevel(Number(e.target.value))} />
          <input type="number" inputMode="numeric" min={entry} max={MAX_LEVEL} value={level} onChange={(e) => setTargetLevel(Number(e.target.value))} />
        </label>
      </div>
      <p className="hint">{t.simEntryHint}</p>
      {picker(t.simBeginner, 5, beginnerClasses, beginnerId, setBeginnerId, unit.beginner)}
      {picker(t.simSpecialty, 20, specialtyClasses, specialtyId, setSpecialtyId, unit.specialty)}
      {picker(t.simAdvanced, 35, advancedClasses, advancedId, setAdvancedId)}
      {picker(t.simMaster, 45, masterClasses, masterId, setMasterId)}
      <h3>{unit.name} — {t.simLevel} {level}</h3>
      <div className="sim-result">
        {stats.map((k) => (
          <div key={k} className="sim-tile">
            <span className="sim-stat">{t.stats[k]}</span>
            <span className="sim-value">{final[k]}</span>
            <span className={`sim-delta ${final[k] > start[k] ? 'up' : ''}`}>{signed(final[k] - start[k])}</span>
          </div>
        ))}
        <div className="sim-tile total">
          <span className="sim-stat">{t.total}</span>
          <span className="sim-value">{total(final)}</span>
          <span className="sim-delta">{signed(total(final) - total(start))}</span>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{unit.name}</th>
              {stats.map((k) => (
                <th key={k}>{t.stats[k]}</th>
              ))}
              <th>{t.total}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [`${t.simLevel} 1`, start],
              ...(entry > 1 ? [[`${t.simLevel} ${entry} (${t.simEntryShort})`, atEntry] as const] : []),
              ...(level > entry ? [[`${t.simLevel} ${level}`, final] as const] : []),
            ].map(([label, s]) => (
              <tr key={label as string}>
                <th scope="row">{label as string}</th>
                {stats.map((k) => (
                  <td key={k}>{(s as typeof start)[k]}</td>
                ))}
                <td>{total(s as typeof start)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
