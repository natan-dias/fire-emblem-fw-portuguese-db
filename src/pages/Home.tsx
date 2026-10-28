import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

export default function Home() {
  const { t } = useI18n()
  return (
    <div className="home">
      <aside className="disclaimer">
        <strong>{t.disclaimerTitle}:</strong> {t.disclaimer}
      </aside>
      <img src={`${import.meta.env.BASE_URL}portraits/title/FE-title-screen.jpg`} alt={t.homeImageAlt} />
      <h2>{t.homeGoalTitle}</h2>
      <p>{t.homeGoal}</p>
      <h2>{t.homeFeaturesTitle}</h2>
      <ul>
        <li><Link to="/personagens">{t.characters}</Link>: {t.homeCharacters}</li>
        <li><Link to="/recrutamento">{t.recruitment}</Link>: {t.homeRecruitment}</li>
        <li><Link to="/magias">{t.spells}</Link>: {t.homeSpells}</li>
      </ul>
    </div>
  )
}
