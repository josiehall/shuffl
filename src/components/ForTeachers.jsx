import { Reveal, Suit } from './primitives.jsx'
import { scrollToId } from './Nav.jsx'

const TYPES = [
  {
    badge: 'Still in the classroom',
    title: 'Curious, but not ready to jump',
    body: 'You love the kids. You do not love marking at 10pm on a Sunday. You want to explore what else is out there without torching a career you spent years building — or breathing a word until you’re ready.',
    foot: 'Explore quietly, on your own timeline.',
  },
  {
    badge: 'Just handed in your notice',
    title: 'Out — and I need a real route',
    body: 'You’ve done the brave bit. Now you need an actual next step, not another PGCE-shaped detour or a career coach who’s never left the building. You need a route to a job that respects what you already know.',
    foot: 'Translate your experience → land somewhere real.',
  },
]

export default function ForTeachers() {
  return (
    <section
      id="teachers"
      className="scroll-mt-20 py-20 md:py-28"
    >
      <div className="wrap">
        <div className="overflow-hidden rounded-[28px] border border-ink/10 bg-card shadow-card">
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            {/* Left: the pitch */}
            <div className="p-8 md:p-12">
              <Reveal>
                <span className="eyebrow">
                  <Suit suit="spade" className="h-3.5 w-3.5" />
                  Shuffl for teachers
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance md:text-[2.9rem]">
                  Teachers — <span className="italic text-red">this one’s
                  for you.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
                  You’ve spent years making everyone else’s growth your job. Here’s
                  a weird idea: what if it were yours for a bit? We’re starting with
                  teachers because you’ve got more transferable skill than anyone
                  gives you credit for — and fewer safe ways to prove it.
                </p>
              </Reveal>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {TYPES.map((t, i) => (
                  <Reveal key={t.badge} delay={0.12 + i * 0.08}>
                    <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-paper-deep/40 p-5">
                      <span className="w-fit rounded-full bg-ink px-3 py-1 text-xs font-semibold text-paper">
                        {t.badge}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
                        {t.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                        {t.body}
                      </p>
                      <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-red">
                        <Suit suit="heart" className="h-3.5 w-3.5" />
                        {t.foot}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.28}>
                <button
                  onClick={() => scrollToId('waitlist')}
                  className="btn-lime mt-8"
                >
                  Get on the teachers’ list →
                </button>
              </Reveal>
            </div>

            {/* Right: the summer window */}
            <div className="relative flex flex-col justify-center gap-4 bg-ink p-8 text-paper md:p-12">
              <div className="grain absolute inset-0" />
              <Reveal>
                <span className="text-5xl">☀️</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h3 className="font-display text-2xl font-semibold leading-tight">
                  The six-week window
                </h3>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="leading-relaxed text-paper/80 text-pretty">
                  The summer holiday is the best runway you’ll get all year. Six
                  weeks is enough to actually try something — not just refresh job
                  boards and feel vaguely sick about September.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-2 rounded-2xl border border-paper/15 bg-paper/[0.06] p-5">
                  <p className="font-display text-lg font-semibold text-lime">
                    Let’s not waste it.
                  </p>
                  <p className="mt-1 text-sm text-paper/70">
                    Join the waitlist now and we’ll build the first teacher cohort
                    around the calendar you actually live by — terms, half-terms
                    and all.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
