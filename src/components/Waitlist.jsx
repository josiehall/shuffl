import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Suit } from './primitives.jsx'

/* --------------------------------------------------------------------------
 * TODO(backend): wire these two handlers to your provider of choice.
 * The whole page works with no backend today — submissions are logged to the
 * console and the UI advances optimistically. To go live, replace the bodies
 * below with a real request (keep the shape of `payload`):
 *
 *   Formspree:  await fetch('https://formspree.io/f/XXXX', {
 *                 method: 'POST',
 *                 headers: { 'Content-Type': 'application/json' },
 *                 body: JSON.stringify(payload),
 *               })
 *   Mailchimp:  POST to your embedded form action / a serverless proxy.
 *   Airtable:   POST to https://api.airtable.com/v0/{baseId}/{table}
 *               with an Authorization: Bearer {token} header (via a proxy so
 *               the token is never shipped to the browser).
 *
 * Both functions should throw on failure so the UI can show an error state.
 * ------------------------------------------------------------------------ */
async function submitEmail(payload) {
  // TODO(backend): replace with a real POST to Formspree / Mailchimp / Airtable.
  console.log('[Shuffl waitlist] new sign-up →', payload)
  await new Promise((r) => setTimeout(r, 550)) // simulate the network
}

async function submitWillingnessToPay(payload) {
  // TODO(backend): PATCH/append this to the same record created above,
  // keyed by email, so pay-preference lands alongside the sign-up.
  console.log('[Shuffl waitlist] willingness-to-pay →', payload)
  await new Promise((r) => setTimeout(r, 450))
}

// Pay STRUCTURE preference — qualitative on purpose. We deliberately do NOT
// show invented prices (we've done no price research yet, and a made-up number
// would just anchor the magnitude question below). The trade-off is named in
// words so "pay on placement" isn't a risk-free freebie.
const PAY_PREFS = [
  {
    id: 'upfront',
    emoji: '🎯',
    title: 'Upfront',
    sub: 'Best price — one payment, you’re backing yourself.',
  },
  {
    id: 'plan',
    emoji: '🗓️',
    title: 'Payment plan',
    sub: 'Spread it monthly, for a small premium.',
  },
  {
    id: 'placement',
    emoji: '🤝',
    title: 'Pay later, if it works',
    sub: 'Costs more — you only pay if you actually land a new role.',
  },
]

// Magnitude probe — WIDE, UNANCHORED bands spanning £0 → £5k+. This is the
// actual price-research signal, so we ask it first and keep the spread broad
// on purpose (no "recommended", no anchor near a guessed number).
const PRICE_BANDS = [
  { id: 'lt250', label: 'Under £250' },
  { id: '250-1000', label: '£250–£1,000' },
  { id: '1000-2500', label: '£1,000–£2,500' },
  { id: '2500-5000', label: '£2,500–£5,000' },
  { id: '5000+', label: '£5,000+' },
  { id: 'placed-only', label: 'Only if I get placed' },
]

export default function Waitlist() {
  const [stage, setStage] = useState('idle') // idle | joined | done
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error

  // WTP answers
  const [pref, setPref] = useState(null)
  const [band, setBand] = useState(null)
  const [wtpStatus, setWtpStatus] = useState('idle')

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function handleJoin(e) {
    e.preventDefault()
    if (!emailValid || status === 'loading') return
    setStatus('loading')
    try {
      await submitEmail({ email, source: 'landing-hero', ts: new Date().toISOString() })
      setStage('joined')
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  async function handleWtp() {
    if (wtpStatus === 'loading') return
    setWtpStatus('loading')
    try {
      await submitWillingnessToPay({
        email,
        payPreference: pref,
        fairPrice: band,
        ts: new Date().toISOString(),
      })
      setStage('done')
    } catch {
      setWtpStatus('idle')
      setStage('done') // never block the user on the optional probe
    }
  }

  return (
    <section id="waitlist" className="scroll-mt-20 py-20 md:py-28">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-12 text-paper shadow-card md:px-14 md:py-16">
          <div className="grain absolute inset-0" />
          {/* deco suits */}
          <Suit suit="spade" className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rotate-12 text-paper/[0.05]" />
          <Suit suit="diamond" className="pointer-events-none absolute -bottom-8 -left-6 h-28 w-28 -rotate-12 text-red/20" />

          <div className="relative mx-auto max-w-2xl text-center">
            <AnimatePresence mode="wait">
              {/* ---------------------------------------------------- IDLE */}
              {stage === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lime">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    Join the waitlist
                  </span>

                  <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance md:text-5xl">
                    Ready to deal yourself{' '}
                    <span className="italic text-lime">back in?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-paper/75 text-pretty">
                    Drop your email. We’ll tell you the moment the first cohort
                    opens — no spam, no 40-email “nurture sequence,” just the good
                    stuff.
                  </p>

                  <form
                    onSubmit={handleJoin}
                    className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                  >
                    <div className="flex-1">
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@wherever.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (status === 'error') setStatus('idle')
                        }}
                        className="h-[52px] w-full rounded-full border-2 border-paper/15 bg-paper/[0.06] px-5 text-paper placeholder-paper/40 transition-colors focus:border-lime focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!emailValid || status === 'loading'}
                      className="btn-lime h-[52px] shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Dealing…' : 'Deal me in →'}
                    </button>
                  </form>

                  <p className="mt-3 h-5 text-sm">
                    {status === 'error' ? (
                      <span className="text-red">
                        Something jammed the deck — give it another go?
                      </span>
                    ) : (
                      <span className="text-paper/45">
                        Free to join · Unsubscribe in one click · ~2 emails a month, tops
                      </span>
                    )}
                  </p>
                </motion.div>
              )}

              {/* -------------------------------------------------- JOINED */}
              {stage === 'joined' && (
                <motion.div
                  key="joined"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0.6, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-2xl"
                  >
                    🎉
                  </motion.div>
                  <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">
                    You’re in the deck.
                  </h2>
                  <p className="mx-auto mt-3 max-w-lg text-paper/75 text-pretty">
                    One quick thing while you’re here — 30 seconds, then we’ll
                    leave you alone. It genuinely shapes what we build.
                  </p>

                  {/* WTP #1: magnitude — asked FIRST, unanchored. This is the
                      real price signal, so nothing above it hints at a number. */}
                  <div className="mt-9 text-left">
                    <p className="text-center font-display text-xl font-semibold text-paper">
                      For the full Shuffl programme — skills, direction, real
                      placements and routes into employers — what feels{' '}
                      <span className="text-lime">fair</span> to pay?
                    </p>
                    <p className="mx-auto mt-2 max-w-md text-center text-sm text-paper/55">
                      No wrong answer — we genuinely haven’t set a price. Your gut
                      is the useful bit.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {PRICE_BANDS.map((b) => {
                        const active = band === b.id
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setBand(active ? null : b.id)}
                            className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                              active
                                ? 'border-lime bg-lime text-ink'
                                : 'border-paper/20 bg-transparent text-paper/80 hover:border-paper/50'
                            }`}
                          >
                            {b.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* WTP #2: structure preference — qualitative, no numbers. */}
                  <div className="mt-8 text-left">
                    <p className="text-center text-paper/80">
                      And how would you rather pay? Heads up — the less risk you
                      carry, the more it’d cost.
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {PAY_PREFS.map((p) => {
                        const active = pref === p.id
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPref(active ? null : p.id)}
                            className={`flex flex-col rounded-2xl border-2 p-4 text-left transition-all ${
                              active
                                ? 'border-lime bg-lime/10 shadow-[0_0_0_3px_rgba(205,235,75,0.15)]'
                                : 'border-paper/15 bg-paper/[0.04] hover:border-paper/35'
                            }`}
                          >
                            <span className="text-xl">{p.emoji}</span>
                            <span className="mt-2 block font-semibold text-paper">
                              {p.title}
                            </span>
                            <span className="mt-1 block text-sm leading-snug text-paper/60">
                              {p.sub}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleWtp}
                      disabled={wtpStatus === 'loading'}
                      className="btn-lime disabled:opacity-60"
                    >
                      {wtpStatus === 'loading' ? 'Saving…' : 'Lock it in →'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStage('done')}
                      className="text-sm font-medium text-paper/55 underline-offset-4 hover:text-paper hover:underline"
                    >
                      Skip — just keep my spot
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ---------------------------------------------------- DONE */}
              {stage === 'done' && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 15 }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-2xl"
                  >
                    ♠
                  </motion.div>
                  <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">
                    Consider yourself dealt in.
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-paper/75 text-pretty">
                    We’ve got your spot{pref || band ? ' — and your two cents, which matters more than you’d think' : ''}.
                    Keep an eye on your inbox: when the first cohort opens, you’ll
                    be among the first to know.
                  </p>
                  <p className="mt-6 text-sm text-paper/45">
                    In the meantime — go easy on the Sunday-night dread. Help’s on the way.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
