import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { useI18n } from './i18n'
import Home from './pages/Home'
import Characters from './pages/Characters'
import Recruitment from './pages/Recruitment'
import Spells from './pages/Spells'

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
          <NavLink to="/" end>{t.home}</NavLink>
          <NavLink to="/personagens">{t.characters}</NavLink>
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
          <Route path="/" element={<Home />} />
          <Route path="/personagens" element={<Characters />} />
          <Route path="/recrutamento" element={<Recruitment />} />
          <Route path="/magias" element={<Navigate to="/magias/white-magic" replace />} />
          <Route path="/magias/*" element={<SpellsTabs />} />
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
