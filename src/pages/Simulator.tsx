import { useState } from 'react'
import { characters } from '../characters'
import { classGrowths, unitGrowths } from '../growths'
import { useI18n } from '../i18n'
import type { Growths, StatKey } from '../types'
import { classTiers } from './Classes'

const stats: StatKey[] = ['hp', 'str', 'mag', 'spd', 'dex', 'def', 'res', 'lck', 'cha']
const total = (g: Growths) => stats.reduce((sum, k) => sum + (g[k] ?? 0), 0)
const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : '0')

const units = unitGrowths
  .map((u) => ({ ...u, name: characters.find((c) => c.id === u.id)?.name ?? u.id }))
  .sort((a, b) => a.name.localeCompare(b.name))

export default function Simulator() {
  const { t } = useI18n()
  const [unitId, setUnitId] = useState(units[0]?.id ?? '')
  const [tier, setTier] = useState(classTiers[0])
  const [classId, setClassId] = useState('')

  const unit = units.find((u) => u.id === unitId)
  const cls = classGrowths.find((c) => c.id === classId)
  const tierClasses = classGrowths.filter((c) => c.tier === tier)
  const base = unit?.growths ?? {}
  const mod = cls?.growths ?? {}
  const final: Growths = Object.fromEntries(stats.map((k) => [k, (base[k] ?? 0) + (mod[k] ?? 0)]))

  return (
    <>
      <label className="sim-controls">
        {t.character}
        <select value={unitId} onChange={(e) => setUnitId(e.target.value)}>
          {units.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </label>
      <h3>{t.simClass}</h3>
      <nav className="subnav">
        {classTiers.map((x) => (
          <button key={x} type="button" aria-pressed={x === tier} className={x === tier ? 'active' : ''} onClick={() => { setTier(x); if (x === 'Base') setClassId('') }}>{x}</button>
        ))}
      </nav>
      <nav className="subnav">
        {tier === 'Base' && (
          <button type="button" className={classId === '' ? 'active' : ''} onClick={() => setClassId('')}>{t.simNoClass}</button>
        )}
        {tierClasses.map((c) => (
          <button key={c.id} type="button" aria-pressed={c.id === classId} className={c.id === classId ? 'active' : ''} onClick={() => setClassId(c.id)}>{c.name}</button>
        ))}
      </nav>
      <h3>{cls ? `${unit?.name} + ${cls.name}` : unit?.name}</h3>
      <div className="sim-result">
        {stats.map((k) => (
          <div key={k} className="sim-tile">
            <span className="sim-stat">{t.stats[k]}</span>
            <span className="sim-value">{final[k]}</span>
            <span className={`sim-delta ${(mod[k] ?? 0) > 0 ? 'up' : (mod[k] ?? 0) < 0 ? 'down' : ''}`}>{signed(mod[k] ?? 0)}</span>
          </div>
        ))}
        <div className="sim-tile total">
          <span className="sim-stat">{t.total}</span>
          <span className="sim-value">{total(final)}</span>
          <span className="sim-delta">{signed(total(mod))}</span>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{cls ? `${unit?.name} + ${cls.name}` : unit?.name}</th>
              {stats.map((k) => (
                <th key={k}>{t.stats[k]}</th>
              ))}
              <th>{t.total}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{t.simBase}</th>
              {stats.map((k) => (
                <td key={k}>{base[k] ?? 0}</td>
              ))}
              <td>{total(base)}</td>
            </tr>
            <tr>
              <th scope="row">{t.simMod}</th>
              {stats.map((k) => (
                <td key={k}>{signed(mod[k] ?? 0)}</td>
              ))}
              <td>{signed(total(mod))}</td>
            </tr>
            <tr>
              <th scope="row">{t.simFinal}</th>
              {stats.map((k) => (
                <td key={k}><strong>{final[k]}</strong></td>
              ))}
              <td><strong>{total(final)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      {cls?.tiers && <p className="hint">{t.simLevelNote}</p>}
    </>
  )
}
