import { Reveal, Suit } from './primitives.jsx'

const SIGNS = [
  'You’re good at your job — you’re just not sure it’s *your* job.',
  'You’ve got real experience and a nagging “is this it?”',
  'You want a change, not a gap year or a breakdown.',
  'You’re done reading about it and ready to actually try something.',
]

const SWAPS = [
  'Marketers eyeing UX',
  'Lawyers eyeing startups',
  'Teachers eyeing anything',
  'Bankers eyeing climate',
  'Consultants eyeing craft',
  'Nurses eyeing product',
  'Engineers eyeing design',
]

function Marquee() {
  const items = [...SWAPS, ...SWAPS]
  return (
    <div className="relative flex overflow-hidden border-y border-ink/10 bg-paper-deep/50 py-4">
      <div className="flex shrink-0 animate-marquee gap-3 pr-3">
        {items.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-ink/10 bg-card px-4 py-2 text-sm font-medium text-ink-soft"
          >
            <Suit
              suit={['spade', 'heart', 'club', 'diamond'][i % 4]}
              className={`h-3 w-3 ${i % 4 === 1 || i % 4 === 3 ? 'text-red' : 'text-ink'}`}
            />
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Render *emphasis* markers as italic red spans. */
function Emph({ text }) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? (
          <em key={i} className="text-red not-italic">
            {p.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export default function WhoItsFor() {
  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow">
                <Suit suit="club" className="h-3.5 w-3.5" />
                Not just teachers
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance md:text-5xl">
                For experienced people{' '}
                <span className="italic text-red">itching to mix it up.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft text-pretty">
                Teachers are where we’re starting — not where we stop. If you’re
                somewhere around 25–35 (give or take a birthday), a few years into
                a career, and standing at a crossroads, you’re our kind of people.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ul className="space-y-3">
              {SIGNS.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-card p-4 shadow-card-sm"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-lime text-ink">
                    <Suit suit="spade" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.975rem] leading-relaxed text-ink">
                    <Emph text={s} />
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="mt-14">
        <Marquee />
      </div>
    </section>
  )
}
