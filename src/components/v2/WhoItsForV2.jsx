import { Reveal } from '../primitives.jsx'

const SIGNS = [
  'You’re good at your job — you’re just not sure it’s *your* job.',
  'You’ve got real experience and a nagging “is this it?”',
  'You want a change, not a gap year or a breakdown.',
  'You’re done reading about it and ready to actually try something.',
]

const SWAPS = [
  'MARKETERS → UX',
  'LAWYERS → STARTUPS',
  'TEACHERS → ANYTHING',
  'BANKERS → CLIMATE',
  'CONSULTANTS → CRAFT',
  'NURSES → PRODUCT',
  'ENGINEERS → DESIGN',
]

function Emph({ text }) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? (
          <em key={i} className="not-italic text-cobalt">
            {p.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export default function WhoItsForV2() {
  const items = [...SWAPS, ...SWAPS]
  return (
    <section className="bg-bone py-20 md:py-28">
      <div className="wrap2">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow2 text-cobalt">
                <span className="h-2 w-2 rounded-full bg-cobalt" />
                Not just teachers
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display2 mt-6 text-[clamp(2.4rem,6vw,5rem)]">
                For people itching
                <br />
                to <span className="text-cobalt">mix it up.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-noir/70">
                Teachers are where we’re starting — not where we stop. If you’re
                somewhere around 25–35 (give or take a birthday), a few years into
                a career, and standing at a crossroads, you’re our kind of people.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ul className="divide-y divide-noir/15 border-y border-noir/15">
              {SIGNS.map((s, i) => (
                <li key={i} className="flex items-start gap-4 py-5">
                  <span className="font-anton text-2xl text-cobalt">0{i + 1}</span>
                  <span className="pt-0.5 text-[1.05rem] leading-relaxed text-noir">
                    <Emph text={s} />
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* bold marquee */}
      <div className="mt-16 flex overflow-hidden border-y-2 border-noir bg-noir py-4 text-bone">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {items.map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap font-anton text-2xl uppercase tracking-tight md:text-3xl"
            >
              {s}
              <span className="text-neon">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
