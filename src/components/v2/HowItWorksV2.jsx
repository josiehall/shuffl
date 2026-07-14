import { Reveal } from '../primitives.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Skills translation',
    tag: 'What you’ve got',
    body: 'We decode a decade of experience into skills that actually travel. Turns out “ran a classroom of thirty” is stakeholder management, crisis comms and ops, all at once.',
  },
  {
    n: '02',
    title: 'Values & direction',
    tag: 'What you want',
    body: 'Work out what you actually want next — not what looks good on LinkedIn. Less “follow your passion,” more figuring out the life you’re trying to build.',
  },
  {
    n: '03',
    title: 'Hands-on placements',
    tag: 'Try before you commit',
    body: 'The bit no one else offers: short, real, hands-on placements. Feel the actual job — the good days and the boring ones — before you leap.',
    highlight: 'neon',
  },
  {
    n: '04',
    title: 'Routes into employers',
    tag: 'Real doors, not dead ends',
    body: 'We connect you to employers who are genuinely hiring — not a certificate and a “good luck out there.” Real routes into real jobs.',
    highlight: 'cobalt',
  },
]

export default function HowItWorksV2() {
  return (
    <section id="how" className="scroll-mt-20 bg-noir py-20 text-bone md:py-28">
      <div className="wrap2">
        <Reveal>
          <span className="eyebrow2 text-neon">
            <span className="h-2 w-2 rounded-full bg-neon" />
            The model
          </span>
        </Reveal>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.05}>
            <h2 className="display2 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
              Four steps. One cohort.
              <br />
              <span className="text-neon">No blind leaps.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-bone/60">
              You go through it with a small group doing the same brave, sensible
              thing. Nobody does this alone.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 divide-y divide-bone/15 border-y border-bone/15">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.06 * i}>
              <div className="group grid items-start gap-4 py-8 md:grid-cols-[auto_1fr_auto] md:gap-10">
                <span
                  className={`font-anton text-6xl leading-none md:text-8xl ${
                    s.highlight === 'neon'
                      ? 'text-neon'
                      : s.highlight === 'cobalt'
                        ? 'text-cobalt'
                        : 'text-bone/25 transition-colors group-hover:text-bone'
                  }`}
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="font-anton text-3xl uppercase tracking-tight md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-bone/65">{s.body}</p>
                </div>
                <span
                  className={`w-fit whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] md:mt-2 ${
                    s.highlight === 'neon'
                      ? 'bg-neon text-noir'
                      : s.highlight === 'cobalt'
                        ? 'bg-cobalt text-bone'
                        : 'border border-bone/25 text-bone/70'
                  }`}
                >
                  {s.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-2xl text-lg text-bone/75">
            The white space, in plain terms:{' '}
            <span className="text-neon">try the work for real</span>, then walk
            through a <span className="text-cobalt-deep bg-bone px-1 font-semibold">real door</span>{' '}
            into it. That’s the whole idea.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
