import { NavLink, Route, Routes } from 'react-router-dom'
import { useI18n } from './i18n'
import Characters from './pages/Characters'
import Recruitment from './pages/Recruitment'

export default function App() {
  const { t, lang, setLang } = useI18n()
  return (
    <>
      <header className="header">
        <h1>{t.title}</h1>
        <nav>
          <NavLink to="/" end>{t.characters}</NavLink>
          <NavLink to="/recrutamento">{t.recruitment}</NavLink>
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
        </Routes>
      </main>
      <footer className="footer">
        {t.credit}{' '}
        <a href="https://fefw-planner-server.vercel.app" target="_blank" rel="noreferrer">Fortune Weaver</a>
      </footer>
    </>
  )
}
