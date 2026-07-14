import { Reveal, Suit } from './primitives.jsx'

const STEPS = [
  {
    n: '01',
    suit: 'spade',
    title: 'Skills translation',
    tag: 'What you’ve got',
    body: 'We decode a decade of experience into skills that actually travel. Turns out “ran a classroom of thirty” is stakeholder management, crisis comms and ops, all at once.',
  },
  {
    n: '02',
    suit: 'heart',
    title: 'Values & direction',
    tag: 'What you want',
    body: 'Work out what you actually want next — not what looks good on LinkedIn. Less “follow your passion,” more figuring out the life you’re trying to build.',
  },
  {
    n: '03',
    suit: 'diamond',
    title: 'Hands-on placements',
    tag: 'Try before you commit',
    body: 'The bit no one else offers: short, real, hands-on exploration placements. Feel the actual job — the good days and the boring ones — before you leap.',
    highlight: true,
  },
  {
    n: '04',
    suit: 'club',
    title: 'Routes into employers',
    tag: 'Real doors, not dead ends',
    body: 'We connect you to employers who are genuinely hiring — not a certificate and a “good luck out there.” Real routes into real jobs.',
    highlight: true,
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-ink py-20 text-paper md:py-28">
      <div className="wrap">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
            <Suit suit="diamond" className="h-3.5 w-3.5 text-lime" />
            The model
          </span>
        </Reveal>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance md:text-5xl">
              Four steps. One cohort.{' '}
              <span className="italic text-lime">No blind leaps.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-paper/70 text-pretty">
              You go through it with a small group of people doing the same brave,
              sensible thing. Nobody reshuffles alone.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.08 * i}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-card border p-7 transition-transform duration-300 hover:-translate-y-1.5 ${
                  s.highlight
                    ? 'border-lime/40 bg-lime/[0.08]'
                    : 'border-paper/15 bg-paper/[0.04]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-semibold text-paper/25 transition-colors group-hover:text-lime/50">
                    {s.n}
                  </span>
                  <Suit
                    suit={s.suit}
                    className={`h-8 w-8 ${s.highlight ? 'text-lime' : 'text-paper/40'}`}
                  />
                </div>

                <span
                  className={`mt-6 w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    s.highlight ? 'bg-lime text-ink' : 'bg-paper/10 text-paper/70'
                  }`}
                >
                  {s.tag}
                </span>

                <h3 className="mt-4 font-display text-2xl font-semibold text-paper">
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-paper/70">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-lg text-paper/80 text-pretty">
            The white space, in plain terms:{' '}
            <span className="text-lime">try the work for real</span>, then walk
            through a <span className="text-lime">real door</span> into it. That’s
            the whole idea.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
