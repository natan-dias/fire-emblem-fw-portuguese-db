import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { useI18n } from './i18n'
import Characters from './pages/Characters'
import Recruitment from './pages/Recruitment'
import Spells from './pages/Spells'

function SpellsTabs() {
  const { t } = useI18n()
  return (
    <>
      <nav className="subnav">
        <NavLink to="/magias/brancas">{t.whiteMagic}</NavLink>
        <NavLink to="/magias/negras">{t.blackMagic}</NavLink>
      </nav>
      <Routes>
        <Route path="brancas" element={<Spells kind="white" />} />
        <Route path="negras" element={<Spells kind="black" />} />
      </Routes>
    </>
  )
}

export default function App() {
  const { t, lang, setLang } = useI18n()
  return (
    <>
      <header className="header">
        <div>
          <h1>{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>
        <nav>
          <NavLink to="/" end>{t.characters}</NavLink>
          <NavLink to="/recrutamento">{t.recruitment}</NavLink>
          <NavLink to="/magias">{t.spells}</NavLink>
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
          <Route path="/" element={<Characters />} />
          <Route path="/recrutamento" element={<Recruitment />} />
          <Route path="/magias" element={<Navigate to="/magias/brancas" replace />} />
          <Route path="/magias/*" element={<SpellsTabs />} />
        </Routes>
      </main>
      <footer className="footer">
        {t.credit}{' '}
        <a href="https://fefw-planner-server.vercel.app" target="_blank" rel="noreferrer">Fortune Weaver</a>
      </footer>
    </>
  )
}
