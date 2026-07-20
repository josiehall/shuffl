import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NavV2 from './components/v2/NavV2.jsx'
import FooterV2 from './components/v2/FooterV2.jsx'
import { Reveal } from './components/primitives.jsx'

/* --------------------------------------------------------------------------
 * TODO(backend): employer interest capture. Kept SEPARATE from the candidate
 * waitlist on purpose so the two audiences don't muddy each other's numbers —
 * note `audience: 'employer'` in the payload. Wire to the same provider as
 * WaitlistV2.jsx (Formspree / Mailchimp / Airtable), or a separate list.
 * ------------------------------------------------------------------------ */
async function submitEmployerInterest(payload) {
  // TODO(backend): replace with a real POST.
  console.log('[Shuffl employers] interest registered →', payload)
  await new Promise((r) => setTimeout(r, 550))
}

const BENEFITS = [
  {
    n: '01',
    title: 'Senior hands, not entry-level',
    body: 'A decade of real experience walks in: someone who’s run projects, handled pressure and managed people who don’t report to them. Hand them something real and they’ll just get on with it.',
  },
  {
    n: '02',
    title: 'They’ll make your team sharper',
    body: 'Career-changers bring a craft from another world — and teachers are the best explainers you’ll ever meet. A workshop for your juniors, a week of mentoring, a better way to run a meeting. Your team gets something back, not just you.',
  },
  {
    n: '03',
    title: 'An honest outside read',
    body: 'Someone who’s never seen your process spots what’s gone invisible to everyone who has. Cheaper than a consultant — and they’ll actually tell you the truth.',
  },
  {
    n: '04',
    title: 'Maybe your next hire',
    body: 'No pressure and no fee to host. But if the fit’s obvious after a few weeks of real work, you’ve skipped the gamble every other hire is.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Tell us what a placement could look like',
    body: 'A team, a project, a few days or a few weeks. You set the shape — we’ll tell you honestly whether it’ll work.',
  },
  {
    n: '02',
    title: 'We match and prep',
    body: 'We put forward people whose skills and direction genuinely fit, already briefed on you and your work. No CV spam.',
  },
  {
    n: '03',
    title: 'They do real work',
    body: 'A short, structured placement on something that actually matters. You see how they think, not how they interview.',
  },
  {
    n: '04',
    title: 'Take it further, or don’t',
    body: 'Maybe it’s a hire. Maybe it’s a project delivered and a team that learned something. Either way you’re ahead — and there’s no obligation on anyone.',
  },
]

const FAQ = [
  {
    q: 'How much of my team’s time does this take?',
    a: 'Less than you’d fear. You give them a real piece of work and someone to ask the odd question — think keen new starter, not school trip. They’re experienced adults who can run with a brief, not a blank slate to supervise.',
  },
  {
    q: 'What does it cost to host?',
    a: 'Nothing to host. We only earn if you decide to hire someone you met this way — a simple success fee, no upfront cost and no “just in case” retainer.',
  },
  {
    q: 'How long is a placement?',
    a: 'Short and defined — a few days to a few weeks, shaped around a real task and your calendar. Long enough to see something real, short enough that nobody’s life is on hold.',
  },
  {
    q: 'Do I have to hire anyone?',
    a: 'No — and please don’t feel you should. Most of the value is in the work itself and what your team picks up. A hire is the happy upside, not the deal.',
  },
  {
    q: 'We’re not hiring right now — is it still worth it?',
    a: 'Honestly, yes. A fresh outside brain on a nagging project, a workshop for your juniors, an honest look at a process from someone who’s never seen it — worth having, open role or not.',
  },
  {
    q: 'Are they any good, or am I babysitting?',
    a: 'They turn up with a decade of experience and a lot of prep — skills translated, direction set, briefed on you before day one. A capable adult who chose to be here, not someone you’re carrying.',
  },
  {
    q: 'Who handles the boring bits — paperwork, logistics?',
    a: 'We do. We sort the matching, the prep and the admin with you so hosting stays genuinely light. You bring the work and a desk — or a Zoom link.',
  },
]

function scrollToForm() {
  const el = document.getElementById('employer-form')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* Same accordion pattern as the homepage FAQ. */
function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-noir/15">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="flex-1 font-anton text-xl uppercase tracking-tight md:text-2xl">
          {item.q}
        </span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xl leading-none transition-all duration-300 ${
            isOpen ? 'rotate-45 bg-cobalt text-bone' : 'bg-noir text-bone'
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-[1.05rem] leading-relaxed text-noir/70">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function EmployersPage() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [openFaq, setOpenFaq] = useState(0)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!emailValid || status === 'loading') return
    setStatus('loading')
    try {
      await submitEmployerInterest({
        email,
        company,
        audience: 'employer',
        ts: new Date().toISOString(),
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative min-h-screen bg-bone font-archivo text-noir">
      <NavV2 page="employers" />

      <main>
        {/* ---------------------------------------------------------- HERO */}
        <section className="relative overflow-hidden bg-noir text-bone">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-cobalt/30 blur-[120px]" />
            <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-neon/10 blur-[120px]" />
          </div>

          <div className="wrap2 relative flex min-h-[70vh] flex-col justify-center pt-32 pb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="eyebrow2 text-neon">
                <span className="h-2 w-2 rounded-full bg-neon" />
                For employers
              </span>
            </motion.div>

            <motion.h1
              className="display2 mt-7 text-[clamp(2.2rem,6.5vw,6rem)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Borrow someone brilliant
              <br />
              for a few weeks.
              <br />
              Hire them, <span className="text-neon">if it fits.</span>
            </motion.h1>

            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <motion.p
                className="max-w-xl text-lg leading-relaxed text-bone/75 md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                Host a Shuffl placement and you get an experienced career-changer —
                someone who’s spent a decade running things, not fetching coffee —
                on something that actually matters to you. A teacher who’s managed a
                classroom of thirty can fix your onboarding, sharpen how your team
                explains things, or take the nagging project no one’s had time for.
                You get real work done and an honest outside read on your business —
                for the price of a desk and a bit of your time. And if they turn out
                to be brilliant, which they often are, you’ve met your next hire the
                honest way.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <button onClick={scrollToForm} className="btn2-neon shrink-0">
                  Register interest →
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ BENEFITS */}
        <section className="bg-bone py-20 md:py-28">
          <div className="wrap2">
            <Reveal>
              <span className="eyebrow2 text-cobalt">
                <span className="h-2 w-2 rounded-full bg-cobalt" />
                Why host one
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display2 mt-6 max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)]">
                Senior help for a few weeks.
                <br />
                A hire, <span className="text-cobalt">if you want one.</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.n} delay={0.08 * i}>
                  <div className="border-t border-noir/15 pt-6">
                    <span className="font-anton text-4xl text-cobalt">{b.n}</span>
                    <h3 className="mt-3 font-anton text-2xl uppercase tracking-tight">
                      {b.title}
                    </h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-noir/70">
                      {b.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- HOW IT WORKS */}
        <section className="bg-noir py-20 text-bone md:py-28">
          <div className="wrap2">
            <Reveal>
              <span className="eyebrow2 text-neon">
                <span className="h-2 w-2 rounded-full bg-neon" />
                How it works
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display2 mt-6 max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)]">
                Low lift for you.
                <br />
                <span className="text-neon">Genuinely useful</span> for them.
              </h2>
            </Reveal>

            <div className="mt-14 divide-y divide-bone/15 border-y border-bone/15">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={0.06 * i}>
                  <div className="grid items-start gap-4 py-7 md:grid-cols-[auto_1fr] md:gap-10">
                    <span className="font-anton text-5xl leading-none text-bone/25 md:text-7xl">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-anton text-2xl uppercase tracking-tight md:text-3xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-2xl leading-relaxed text-bone/65">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ FAQ */}
        <section id="employer-faq" className="scroll-mt-20 bg-bone py-20 md:py-28">
          <div className="wrap2">
            <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <Reveal>
                  <span className="eyebrow2 text-cobalt">
                    <span className="h-2 w-2 rounded-full bg-cobalt" />
                    The fair questions
                  </span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="display2 mt-6 text-[clamp(2.2rem,5vw,4.5rem)]">
                    You’ve got
                    <br />
                    questions. <span className="text-cobalt">Good.</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.15}>
                  <button onClick={scrollToForm} className="btn2-cobalt mt-6">
                    Register interest →
                  </button>
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <div className="border-t border-noir/15">
                  {FAQ.map((item, i) => (
                    <FaqItem
                      key={i}
                      item={item}
                      isOpen={openFaq === i}
                      onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- CAPTURE */}
        <section id="employer-form" className="scroll-mt-20 bg-cobalt py-20 text-bone md:py-28">
          <div className="wrap2">
            <div className="mx-auto max-w-2xl text-center">
              <AnimatePresence mode="wait">
                {status !== 'done' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="eyebrow2 text-neon">
                      <span className="h-2 w-2 rounded-full bg-neon" />
                      Founding employers
                    </span>
                    <h2 className="display2 mt-6 text-[clamp(2.2rem,6vw,4.5rem)]">
                      Want first pick?
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg leading-relaxed text-bone/80">
                      We’re building our founding group of employers now — the ones
                      who’ll shape how placements actually work. No commitment, no
                      contracts. Tell us where to find you and we’ll be in touch
                      with the details.
                    </p>

                    <form
                      onSubmit={handleSubmit}
                      className="mx-auto mt-8 flex max-w-md flex-col gap-3"
                    >
                      <label htmlFor="emp-company" className="sr-only">
                        Company
                      </label>
                      <input
                        id="emp-company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="h-[54px] rounded-full border-2 border-bone/30 bg-transparent px-6 text-center font-medium text-bone placeholder-bone/50 focus:border-neon focus:outline-none"
                      />
                      <label htmlFor="emp-email" className="sr-only">
                        Work email
                      </label>
                      <input
                        id="emp-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="Work email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (status === 'error') setStatus('idle')
                        }}
                        className="h-[54px] rounded-full border-2 border-bone/30 bg-transparent px-6 text-center font-medium text-bone placeholder-bone/50 focus:border-neon focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!emailValid || status === 'loading'}
                        className="btn2-neon h-[54px] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {status === 'loading' ? 'Sending…' : 'Register interest →'}
                      </button>
                    </form>

                    <p className="mt-4 h-5 text-sm font-medium">
                      {status === 'error' ? (
                        <span className="text-neon">
                          Something broke — give it another go?
                        </span>
                      ) : (
                        <span className="text-bone/60">
                          Takes 10 seconds · We’ll only email about placements
                        </span>
                      )}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="eyebrow2 text-neon">
                      <span className="h-2 w-2 rounded-full bg-neon" />
                      Got it
                    </span>
                    <h2 className="display2 mt-6 text-[clamp(2.2rem,6vw,4rem)]">
                      Thanks — we’ll be in touch.
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg leading-relaxed text-bone/80">
                      You’re on the founding employer list. We’ll reach out as the
                      first cohort takes shape, with what hosting a placement
                      actually involves — time, cost, and the kind of people you’d
                      be meeting.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <FooterV2 />
    </div>
  )
}
