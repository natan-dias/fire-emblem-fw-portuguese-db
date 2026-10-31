import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { useI18n } from './i18n'
import Home from './pages/Home'
import Characters from './pages/Characters'
import Recruitment from './pages/Recruitment'
import Paralogues from './pages/Paralogues'
import Spells from './pages/Spells'
import CombatArts, { artProfs, weaponProfs } from './pages/CombatArts'

function SpellsTabs() {
  const { t } = useI18n()
  return (
    <>
      <nav className="subnav">
        <NavLink to="/magias/white-magic">{t.whiteMagic}</NavLink>
        <NavLink to="/magias/black-magic">{t.blackMagic}</NavLink>
      </nav>
      <p className="hint">{t.spellsHint}</p>
      <Routes>
        <Route path="white-magic" element={<Spells kind="white" />} />
        <Route path="black-magic" element={<Spells kind="black" />} />
      </Routes>
    </>
  )
}

function ArtsTabs() {
  const { t } = useI18n()
  return (
    <>
      <nav className="subnav">
        {artProfs.map((p) => (
          <NavLink key={p} to={`/artes/${p}`}>{t.profs[p]}</NavLink>
        ))}
      </nav>
      <Routes>
        {artProfs.map((p) => (
          <Route key={p} path={p} element={<>{weaponProfs.includes(p) && <p className="hint">{t.artsHint}</p>}<CombatArts prof={p} /></>} />
        ))}
      </Routes>
    </>
  )
}

export default function App() {
  const { t, lang, setLang } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])
  return (
    <>
      <header className="header">
        <div>
          <h1>{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-label={t.menu}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <nav id="main-nav" className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>
          <NavLink to="/" end>{t.home}</NavLink>
          <NavLink to="/personagens">{t.characters}</NavLink>
          <NavLink to="/recrutamento">{t.recruitment}</NavLink>
          <NavLink to="/paralogues">{t.paralogues}</NavLink>
          <NavLink to="/magias">{t.spells}</NavLink>
          <NavLink to="/artes">{t.combatArts}</NavLink>
        </nav>
        <div className="controls">
          <select aria-label={t.language} value={lang} onChange={(e) => setLang(e.target.value as typeof lang)}>
            <option value="pt-BR">Português (BR)</option>
            <option value="pt-PT">Português (PT)</option>
          </select>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personagens" element={<Characters />} />
          <Route path="/recrutamento" element={<Recruitment />} />
          <Route path="/paralogues" element={<Paralogues />} />
          <Route path="/magias" element={<Navigate to="/magias/white-magic" replace />} />
          <Route path="/magias/*" element={<SpellsTabs />} />
          <Route path="/artes" element={<Navigate to="/artes/sword" replace />} />
          <Route path="/artes/*" element={<ArtsTabs />} />
        </Routes>
      </main>
      <footer className="footer">
        {t.credit}{' '}
        <a href="https://fefw-planner-server.vercel.app" target="_blank" rel="noreferrer">Fortune Weaver</a>
        <div>
          {t.followMe}{' '}
          <a href="https://www.youtube.com/@velhotejogador" target="_blank" rel="noreferrer">YouTube @velhotejogador</a>
        </div>
      </footer>
    </>
  )
}
