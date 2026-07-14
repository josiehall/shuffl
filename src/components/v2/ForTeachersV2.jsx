import { Reveal } from '../primitives.jsx'
import { scrollToId } from './NavV2.jsx'

const TYPES = [
  {
    badge: 'Still in the classroom',
    title: 'Curious, but not ready to jump',
    body: 'You love the kids. You do not love marking at 10pm on a Sunday. Explore what else is out there without torching a career you built — or breathing a word until you’re ready.',
    foot: 'Explore quietly, on your own timeline.',
  },
  {
    badge: 'Just handed in your notice',
    title: 'Out — and I need a real route',
    body: 'You’ve done the brave bit. Now you need an actual next step, not another PGCE-shaped detour. A route to a job that respects what you already know.',
    foot: 'Translate your experience → land somewhere real.',
  },
]

export default function ForTeachersV2() {
  return (
    <section id="teachers" className="scroll-mt-20 bg-cobalt py-20 text-bone md:py-28">
      <div className="wrap2">
        <Reveal>
          <span className="eyebrow2 text-neon">
            <span className="h-2 w-2 rounded-full bg-neon" />
            Shuffl for teachers
          </span>
        </Reveal>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal delay={0.05}>
              <h2 className="display2 text-[clamp(2.4rem,6vw,5rem)]">
                Teachers —
                <br />
                <span className="text-neon">this one’s for you.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/80">
                You’ve spent years making everyone else’s growth your job. Here’s a
                weird idea: what if it were yours for a bit? We’re starting with
                teachers because you’ve got more transferable skill than anyone
                gives you credit for — and fewer safe ways to prove it.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {TYPES.map((t, i) => (
                <Reveal key={t.badge} delay={0.12 + i * 0.08} className="h-full">
                  <div className="flex h-full flex-col bg-noir p-6">
                    <span className="w-fit bg-neon px-3 py-1 text-xs font-bold uppercase tracking-wide text-noir">
                      {t.badge}
                    </span>
                    <h3 className="mt-4 font-anton text-xl uppercase tracking-tight">
                      {t.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-bone/70">
                      {t.body}
                    </p>
                    <p className="mt-4 text-sm font-bold uppercase tracking-wide text-neon">
                      {t.foot}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.28}>
              <button onClick={() => scrollToId('waitlist')} className="btn2-neon mt-8">
                Get on the teachers’ list →
              </button>
            </Reveal>
          </div>

          {/* summer window */}
          <Reveal delay={0.15} className="h-full">
            <div className="flex h-full flex-col justify-center gap-5 bg-bone p-8 text-noir md:p-10">
              <span className="font-anton text-[clamp(3rem,7vw,6rem)] leading-none">
                6 WEEKS
              </span>
              <h3 className="font-anton text-2xl uppercase tracking-tight">
                The summer window
              </h3>
              <p className="leading-relaxed text-noir/70">
                The summer holiday is the best runway you’ll get all year. Six weeks
                is enough to actually try something — not just refresh job boards and
                feel vaguely sick about September.
              </p>
              <div className="border-l-4 border-cobalt bg-cobalt/5 p-5">
                <p className="font-anton text-xl uppercase tracking-tight text-cobalt">
                  Let’s not waste it.
                </p>
                <p className="mt-1 text-sm text-noir/70">
                  Join now and we’ll build the first teacher cohort around the
                  calendar you actually live by — terms, half-terms and all.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
