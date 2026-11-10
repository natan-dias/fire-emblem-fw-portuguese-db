import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

export default function Home() {
  const { t } = useI18n()
  return (
    <div className="home">
      <img src={`${import.meta.env.BASE_URL}portraits/title/FE-title-screen.jpg`} alt={t.homeImageAlt} />
      <h2>{t.homeGoalTitle}</h2>
      <p>{t.homeGoal}</p>
      <h2>{t.homeFeaturesTitle}</h2>
      <ul className="home-tiles">
        <li><Link to="/personagens"><strong>{t.characters}</strong><span>{t.homeCharacters}</span></Link></li>
        <li><Link to="/classes"><strong>{t.classes}</strong><span>{t.homeClasses}</span></Link></li>
        <li><Link to="/recrutamento"><strong>{t.recruitment}</strong><span>{t.homeRecruitment}</span></Link></li>
        <li><Link to="/crescimento"><strong>{t.growth}</strong><span>{t.homeGrowth}</span></Link></li>
        <li><Link to="/simulador"><strong>{t.simulator}</strong><span>{t.homeSimulator}</span></Link></li>
        <li><Link to="/paralogues"><strong>{t.paralogues}</strong><span>{t.homeParalogues}</span></Link></li>
        <li><Link to="/magias"><strong>{t.spells}</strong><span>{t.homeSpells}</span></Link></li>
        <li><Link to="/artes"><strong>{t.combatArts}</strong><span>{t.homeArts}</span></Link></li>
      </ul>
      <aside className="disclaimer">
        <strong>{t.disclaimerTitle}:</strong> {t.disclaimer}
      </aside>
    </div>
  )
}
