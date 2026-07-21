import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../primitives.jsx'
import { scrollToId } from './NavV2.jsx'
import { postSubmission } from '../../lib/submit.js'
import { fetchStarAnswer } from '../../lib/translate.js'

/*
 * Skills Translator — a free taster of the translation work Shuffl does, gated
 * on email for the full version.
 *
 * FREE:   the CV bullet + the roles it points at.
 * GATED:  the same experience rewritten as a STAR interview answer.
 *
 * IMPORTANT — we generate Situation, Task and Action, but NEVER the Result.
 * S/T/A are honestly inferable from the activity someone types; a Result is
 * not. Auto-filling "improved outcomes by 25%" would put a fabricated claim on
 * a real CV and into a real interview, where they'd be asked to back it up.
 * So R is deliberately left as a prompt for them to complete.
 *
 * The translation is entirely client-side. The ONLY network call is the email
 * capture, reusing the existing waitlist path with source: 'skills-translator'.
 */

const MAPPINGS = [
  {
    id: 'lead',
    keywords: ['head of department', 'hod', 'head of year', 'line-manage', 'line manage', 'lead', 'manage staff', 'manager'],
    cv: 'Team lead and people manager — line-managed staff, owned hiring and development, and was accountable for a team’s performance against targets.',
    roles: ['Team Lead', 'Operations Manager', 'Programme Manager', 'L&D Lead'],
    star: {
      s: 'A department of teachers, a fixed budget, and a set of targets somebody else wrote.',
      t: 'Get a team of specialists — none of whom you hired — pulling in the same direction.',
      a: 'Set the priorities for the term, line-managed each of them individually, ran hiring, and had the awkward development conversations early rather than saving them for review season.',
    },
  },
  {
    id: 'room',
    keywords: ['classroom of 30', 'classroom of thirty', 'behaviour', 'behavior', 'manage 30', 'class of 30', 'hold attention', 'classroom'],
    cv: 'Held the attention of, and managed the behaviour of, groups of 30+ every day — reading a room, adapting delivery live, and keeping people engaged under pressure.',
    roles: ['Facilitation / Training', 'Customer Success', 'Account Management', 'Sales'],
    star: {
      s: 'Thirty people in a room, most of whom would rather be somewhere else, five times a day.',
      t: 'Get every one of them to take something new in — and keep them with you for the full hour.',
      a: 'Read the room minute by minute, changed the delivery on the spot when it wasn’t landing, and dealt with disruption without derailing the other twenty-nine.',
    },
  },
  {
    id: 'marking',
    keywords: ['mark', 'marking', 'deadline', 'essays', 'grading', 'feedback'],
    cv: 'Delivered high-volume, quality-checked work against relentless recurring deadlines, with consistent standards and detailed written feedback.',
    roles: ['Operations', 'Quality / Compliance', 'Editorial', 'Analyst'],
    star: {
      s: 'Two hundred pieces of work a week, every week, against a deadline that never once moved.',
      t: 'Turn all of it around to a consistent standard, with feedback specific enough to actually act on.',
      a: 'Built a repeatable process, moderated against the standard so quality didn’t drift, and defended the time in the calendar so the backlog never won.',
    },
  },
  {
    id: 'parents',
    keywords: ['parents’ evening', "parents' evening", 'parents evening', 'parent', 'difficult conversation', 'stakeholder'],
    cv: 'Handled high-stakes conversations with demanding stakeholders — delivering hard messages, managing expectations, and keeping the relationship intact.',
    roles: ['Stakeholder / Client Management', 'Customer Success', 'HR / People'],
    star: {
      s: 'Termly parents’ evenings: sixty back-to-back five-minute conversations, a fair number of them delivering news nobody wanted.',
      t: 'Give honest feedback on a child’s progress without losing the parent’s trust or their cooperation.',
      a: 'Prepped evidence for every case, led with specifics rather than generalities, named the problem plainly, then agreed one concrete next step before they left the table.',
    },
  },
  {
    id: 'planning',
    keywords: ['plan', 'curriculum', 'scheme of work', 'term', 'sequence', 'priorities'],
    cv: 'Planned and sequenced a term’s worth of work backwards from an outcome — scoping, prioritising and adapting the plan as reality moved.',
    roles: ['Project Management', 'Programme Design', 'Product', 'L&D'],
    star: {
      s: 'A term’s worth of material, a fixed end date you don’t control, and a cohort starting from wildly different places.',
      t: 'Get all of them to the same outcome by a date that will not be moving.',
      a: 'Worked backwards from the outcome, sequenced it week by week, built in slack for the weeks that always go wrong, and re-planned mid-term when reality turned up.',
    },
  },
  {
    id: 'data',
    keywords: ['data', 'results', 'assessment', 'tracking', 'track', 'progress', 'attainment'],
    cv: 'Tracked performance data across a cohort, spotted who was falling behind, and intervened early — turning numbers into action.',
    roles: ['Data / Insight Analyst', 'Operations', 'Customer Success'],
    star: {
      s: 'A cohort’s worth of performance data, and a nagging sense that a few of them were quietly drifting.',
      t: 'Spot who was falling behind early enough to still do something about it.',
      a: 'Tracked the numbers on a regular cycle, flagged the outliers, worked out what was actually behind each one, and got targeted support in before it showed up in the final results.',
    },
  },
]

/* Used when nothing matches. */
const GENERIC = {
  cv: 'Ran a full workload independently — juggling competing priorities, fixed deadlines and a dozen stakeholders, without anyone checking your homework.',
  roles: ['Operations', 'Project Management', 'Customer Success'],
  star: {
    s: 'A full workload, a calendar that doesn’t bend, and a dozen people all wanting something different from you.',
    t: 'Deliver every bit of it to standard and on time, with nobody checking your homework.',
    a: 'Prioritised ruthlessly, planned backwards from the deadlines, and adjusted without fuss when the plan met reality.',
  },
}

/* The one part we will not invent for them. */
const RESULT_PROMPT =
  'Your number goes here — results, attendance, retention, budget, headcount, hours saved. It’s the bit only you know, and the bit they’ll ask about.'

const CHIPS = [
  'Head of Department',
  'Managing a classroom of 30',
  'Marking to weekly deadlines',
  'Parents’ evening',
  'Planning a term’s curriculum',
]

/* Match on substrings, assemble the free bullet, de-duped roles, and the STAR
 * answer for the strongest (first) match. */
function translate(input) {
  const text = input.toLowerCase()
  const matched = MAPPINGS.filter((m) => m.keywords.some((k) => text.includes(k)))

  const usedGeneric = matched.length === 0
  const entries = usedGeneric ? [GENERIC] : matched

  return {
    free: entries[0].cv,
    star: entries[0].star,
    roles: [...new Set(entries.flatMap((e) => e.roles))].slice(0, 6),
    usedGeneric,
  }
}

const STAR_PARTS = [
  { key: 's', label: 'Situation' },
  { key: 't', label: 'Task' },
  { key: 'a', label: 'Action' },
]

export default function TranslatorV2() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [email, setEmail] = useState('')
  const [unlocked, setUnlocked] = useState(false) // sticky for the session
  const [status, setStatus] = useState('idle') // idle | loading
  const [saveFailed, setSaveFailed] = useState(false)
  // LLM-written STAR answer; null means "use the curated fallback".
  const [liveStar, setLiveStar] = useState(null)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const [writing, setWriting] = useState(false)

  /* Curated result is instant. If they've already unlocked, re-translating
   * fetches a fresh LLM answer for the new input rather than re-gating them. */
  function runTranslate(text) {
    setResult(translate(text))
    setLiveStar(null)
    if (unlocked) {
      setWriting(true)
      fetchStarAnswer(text)
        .then((s) => s && setLiveStar(s))
        .finally(() => setWriting(false))
    }
  }

  function handleTranslate(e) {
    e?.preventDefault()
    if (!input.trim()) return
    runTranslate(input)
  }

  function handleChip(chip) {
    setInput(chip)
    runTranslate(chip)
  }

  async function handleUnlock(e) {
    e.preventDefault()
    if (!emailValid || status === 'loading') return
    setStatus('loading')
    setSaveFailed(false)

    // Capture the email and write the STAR answer in parallel. Neither can
    // block the unlock: a failed save is noted quietly, and a failed/slow
    // translation silently falls back to the curated answer.
    const [saved, written] = await Promise.allSettled([
      postSubmission({
        type: 'waitlist',
        email,
        source: 'skills-translator',
        ts: new Date().toISOString(),
      }),
      fetchStarAnswer(input),
    ])

    if (saved.status === 'rejected') setSaveFailed(true)
    if (written.status === 'fulfilled' && written.value) setLiveStar(written.value)

    setUnlocked(true)
    setStatus('idle')
  }

  return (
    <section id="translator" className="scroll-mt-20 bg-noir py-20 text-bone md:py-28">
      <div className="wrap2">
        <Reveal>
          <span className="eyebrow2 text-neon">
            <span className="h-2 w-2 rounded-full bg-neon" />
            Try it
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display2 mt-6 text-[clamp(2.2rem,6vw,5rem)]">
            You’ve got the
            <br />
            skills. You just
            <br />
            call them <span className="text-neon">‘teaching’.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/70">
            Type what you actually do in a week. We’ll show you a taste of how it
            reads in the language a hiring manager outside education actually uses
            — free, no sign-up. Want the whole thing as an interview answer? That
            bit’s for the waitlist.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* ------------------------------------------------------- INPUT */}
          <Reveal delay={0.12} className="h-full">
            <form
              onSubmit={handleTranslate}
              className="flex h-full flex-col border-2 border-bone/20 p-6 md:p-8"
            >
              <label
                htmlFor="translator-input"
                className="font-anton text-xl uppercase tracking-tight"
              >
                What you actually do
              </label>

              <textarea
                id="translator-input"
                rows={5}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. I run my department, line-manage four teachers, set the term’s priorities and mark 200 essays a week to deadline"
                className="mt-4 w-full resize-y rounded-2xl border-2 border-bone/25 bg-transparent p-4 leading-relaxed text-bone placeholder-bone/40 focus:border-neon focus:outline-none"
              />

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-bone/50">
                Or borrow one of these
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleChip(chip)}
                    className="rounded-full border-2 border-bone/25 px-4 py-2 text-sm font-medium text-bone/80 transition-colors hover:border-neon hover:text-neon"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="mt-auto pt-7">
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="btn2-neon w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  Translate →
                </button>
              </div>
            </form>
          </Reveal>

          {/* ------------------------------------------------------ OUTPUT */}
          <Reveal delay={0.18} className="h-full">
            <div className="flex h-full flex-col border-2 border-bone/20 p-6 md:p-8">
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-1 flex-col items-center justify-center py-12 text-center"
                  >
                    <span className="font-anton text-5xl text-bone/15">✦</span>
                    <p className="mt-4 max-w-xs text-bone/50">
                      Your translation lands here. Type something, or tap an
                      example — takes a second.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-1 flex-col"
                  >
                    <h3 className="font-anton text-xl uppercase tracking-tight text-neon">
                      In plain, non-classroom English
                    </h3>

                    {result.usedGeneric && (
                      <p className="mt-3 text-sm text-bone/50">
                        Couldn’t find much to grab onto there — here’s the general
                        version. Tap an example for a sharper one.
                      </p>
                    )}

                    {/* Free bullet */}
                    <p className="mt-5 border-l-4 border-neon pl-4 leading-relaxed text-bone">
                      {result.free}
                    </p>

                    {/* Roles — free, they're the hook */}
                    <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-bone/50">
                      Roles this points at
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.roles.map((r) => (
                        <span
                          key={r}
                          className="rounded-full bg-neon px-3 py-1 text-xs font-bold uppercase tracking-wide text-noir"
                        >
                          {r}
                        </span>
                      ))}
                    </div>

                    {/* ---------------------------- STAR (gated) ---------- */}
                    <div className="mt-8 border-t border-bone/15 pt-6">
                      <h4 className="font-anton text-xl uppercase tracking-tight text-neon">
                        Now the interview answer
                      </h4>

                      {unlocked && writing ? (
                        <p className="mt-5 flex items-center gap-2 text-bone/60">
                          <span className="animate-pulse text-neon">✦</span>
                          Writing your answer…
                        </p>
                      ) : unlocked ? (
                        <div className="mt-5 space-y-5">
                          {STAR_PARTS.map((part, i) => (
                            <motion.div
                              key={part.key}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: i * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <p className="text-xs font-bold uppercase tracking-[0.16em] text-neon">
                                {part.label}
                              </p>
                              <p className="mt-1.5 leading-relaxed text-bone">
                                {(liveStar || result.star)[part.key]}
                              </p>
                            </motion.div>
                          ))}

                          {/* The one part we deliberately don't invent. */}
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="border-l-4 border-dashed border-neon/50 pl-4"
                          >
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-neon">
                              Result
                            </p>
                            <p className="mt-1.5 leading-relaxed text-bone/60">
                              {RESULT_PROMPT}
                            </p>
                          </motion.div>
                        </div>
                      ) : (
                        <div className="mt-5">
                          <div className="space-y-5" aria-hidden="true">
                            {[...STAR_PARTS, { key: 'r', label: 'Result' }].map(
                              (part) => (
                                <div key={part.key} className="select-none blur-[5px]">
                                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone/40">
                                    {part.label}
                                  </p>
                                  <p className="mt-1.5 leading-relaxed text-bone/40">
                                    {part.key === 'r'
                                      ? RESULT_PROMPT
                                      : result.star[part.key]}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                          <p className="mt-5 flex items-start gap-2 text-sm text-bone/60">
                            <span className="text-neon">✦</span>
                            <span>
                              The full STAR answer — situation, task, action,
                              result — built from what you just typed. It’s the
                              format every interview outside teaching asks for.
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Gate / confirmation */}
                    <div className="mt-auto pt-7">
                      {!unlocked ? (
                        <form
                          onSubmit={handleUnlock}
                          className="border-2 border-neon/40 bg-neon/[0.06] p-5"
                        >
                          <p className="leading-relaxed text-bone/80">
                            See the full interview answer. Pop your email in —
                            we’ll unlock it here and keep you posted as Shuffl
                            opens up.
                          </p>
                          <label htmlFor="translator-email" className="sr-only">
                            Email address
                          </label>
                          <input
                            id="translator-email"
                            type="email"
                            required
                            inputMode="email"
                            autoComplete="email"
                            placeholder="you@wherever.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-4 h-[52px] w-full rounded-full border-2 border-bone/25 bg-transparent px-5 font-medium text-bone placeholder-bone/40 focus:border-neon focus:outline-none"
                          />
                          <button
                            type="submit"
                            disabled={!emailValid || status === 'loading'}
                            className="btn2-neon mt-3 w-full disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {status === 'loading'
                              ? 'Writing your answer…'
                              : 'Unlock the interview answer →'}
                          </button>
                          <p className="mt-3 text-xs text-bone/45">
                            Takes 5 seconds · We’ll only email about Shuffl. No spam.
                          </p>
                        </form>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45 }}
                          className="border-2 border-neon/40 bg-neon/[0.06] p-5"
                        >
                          <p className="font-anton text-lg uppercase tracking-tight text-neon">
                            That’s you in.
                          </p>
                          <p className="mt-2 leading-relaxed text-bone/80">
                            When the first cohort opens, you’ll be first to hear.
                          </p>
                          {saveFailed && (
                            <p className="mt-3 text-sm text-bone/60">
                              (Couldn’t save your email just then — worth trying
                              again from the waitlist below.)
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={() => scrollToId('waitlist')}
                            className="btn2-neon mt-4 w-full sm:w-auto"
                          >
                            What happens next →
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
