import { Reveal, Suit } from './primitives.jsx'

const PAINS = [
  {
    suit: 'spade',
    title: 'Quit blind?',
    body: 'Bold. Also terrifying. Your rent has never once cared how brave you are feeling this month.',
  },
  {
    suit: 'heart',
    title: 'Another course?',
    body: 'You’ve read the theory. You’ve watched the webinar at 1.5x. You still have no idea if you’d actually like the job.',
  },
  {
    suit: 'club',
    title: 'Work experience?',
    body: 'Genius idea, actually — try the job before you commit. Except no one’s built the grown-up version yet. The ones that exist quietly assume you’ve got no mortgage and nobody depending on you.',
  },
]

export default function Problem() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">
            <Suit suit="heart" className="h-3.5 w-3.5 text-red" />
            The itch
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance md:text-5xl">
            You’re not unhappy, exactly. You’re just{' '}
            <span className="italic text-red">itching.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
            Somewhere between the third coffee and the fourth meeting-that-could-
            have-been-an-email, the thought arrives: <em>is this it?</em> You’re
            curious about a different path. You just can’t find a safe, dignified
            way to actually try one.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PAINS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.08}>
              <div className="group h-full rounded-card border border-ink/10 bg-card p-6 shadow-card-sm transition-transform duration-300 hover:-translate-y-1">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-paper-deep">
                  <Suit
                    suit={p.suit}
                    className={`h-5 w-5 ${p.suit === 'heart' ? 'text-red' : 'text-ink'}`}
                  />
                </span>
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The turn */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex items-start gap-4 rounded-card border-2 border-dashed border-ink/20 bg-paper-deep/40 p-6 md:items-center">
            <span className="hidden text-3xl sm:block">🃏</span>
            <p className="text-lg font-medium leading-relaxed text-ink text-pretty">
              So you stay. Another year. Another Sunday-night dread, another
              “maybe when things calm down.”{' '}
              <span className="text-red">Things never calm down.</span> That’s
              exactly the gap we built Shuffl to fill.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
