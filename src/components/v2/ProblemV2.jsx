import { Reveal } from '../primitives.jsx'

const PAINS = [
  {
    n: '01',
    title: 'Quit blind?',
    body: 'Bold. Also terrifying. Your rent has never once cared how brave you are feeling this month.',
  },
  {
    n: '02',
    title: 'Another course?',
    body: 'You’ve read the theory. You’ve watched the webinar at 1.5x. You still have no idea if you’d actually like the job.',
  },
  {
    n: '03',
    title: 'Work experience?',
    body: 'Genius idea, actually — try the job before you commit. Except no one’s built the grown-up version. The ones that exist assume you’ve no mortgage and nobody depending on you.',
  },
]

export default function ProblemV2() {
  return (
    <section className="bg-bone py-20 md:py-28">
      <div className="wrap2">
        <Reveal>
          <span className="eyebrow2 text-cobalt">
            <span className="h-2 w-2 rounded-full bg-cobalt" />
            The itch
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display2 mt-6 max-w-4xl text-[clamp(2.4rem,6vw,5rem)]">
            You’re not unhappy, exactly.
            <br />
            You’re just <span className="text-cobalt">itching.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-noir/70">
            Somewhere between the third coffee and the fourth meeting-that-could-
            have-been-an-email, the thought arrives: <em>is this it?</em> You’re
            curious about a different path. You just can’t find a safe, dignified
            way to actually try one.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-noir/15 bg-noir/15 md:grid-cols-3">
          {PAINS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.08} className="h-full">
              <div className="group flex h-full flex-col bg-bone p-8 transition-colors duration-300 hover:bg-noir hover:text-bone">
                <span className="font-anton text-6xl text-noir/15 transition-colors group-hover:text-neon">
                  {p.n}
                </span>
                <h3 className="mt-6 font-anton text-2xl uppercase tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-noir/70 transition-colors group-hover:text-bone/70">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-start gap-4 bg-cobalt p-8 text-bone md:flex-row md:items-center md:p-10">
            <p className="text-xl font-semibold leading-snug md:text-2xl">
              So you stay. Another year. Another Sunday-night dread, another “maybe
              when things calm down.” <span className="text-neon">Things never
              calm down.</span> That’s exactly the gap we built Shuffl to fill.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
