import { useState } from 'react'
import { characters } from '../characters'
import { useI18n } from '../i18n'

const portrait = (file: string) => `${import.meta.env.BASE_URL}portraits/${file}`

function Skill({ label, id }: { label: string; id: string | null }) {
  const { skill, t } = useI18n()
  const s = id ? skill(id) : null
  return (
    <div className="skill">
      <span className="skill-label">{label}</span>
      {s ? (
        <>
          <b>{s.name}</b>
          <p>{s.description}</p>
        </>
      ) : (
        <p>{t.noSkill}</p>
      )}
    </div>
  )
}

function UniqueSkills({ ids }: { ids: string[] }) {
  const { skill, t } = useI18n()
  return (
    <div className="skill">
      <span className="skill-label">{t.unique}</span>
      {ids.map((id) => {
        const s = skill(id)
        return (
          <div key={id}>
            <b>{s.name}</b>
            <p>{s.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default function Characters() {
  const { t } = useI18n()
  const [q, setQ] = useState('')
  const list = characters.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()))
  return (
    <>
      <input className="search" type="search" placeholder={t.search} value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="grid">
        {list.map((c) => (
          <article key={c.id} className="card">
            <img className="portrait" src={portrait(c.portrait)} alt={c.name} loading="lazy" />
            <h2>{c.name}</h2>
            <Skill label={t.personal} id={c.personalSkill} />
            <UniqueSkills ids={c.uniqueSkills} />
          </article>
        ))}
      </div>
    </>
  )
}
