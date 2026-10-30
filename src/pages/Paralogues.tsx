import { paralogues } from '../paralogues'
import { useI18n } from '../i18n'

const lords = [
  ['cai', 'Cai'],
  ['dietrich', 'Dietrich'],
  ['theodora', 'Theodora'],
  ['leda', 'Leda'],
] as const

export default function Paralogues() {
  const { t } = useI18n()

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>{t.paralogue}</th>
            {lords.map(([id, name]) => (
              <th key={id}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paralogues.map((p) => (
            <tr key={p.id}>
              <th scope="row">{p.name}</th>
              {lords.map(([id]) => {
                const windows = p.windows[id]
                return (
                  <td key={id}>
                    {!windows
                      ? t.notRecruitable
                      : windows.map((w) => (
                          <div key={w.start}>{w.start === w.end ? w.start : `${w.start} — ${w.end}`}</div>
                        ))}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
