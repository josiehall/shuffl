import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* --------------------------------------------------------------------------
 * TODO(backend): same as v1 — wire these to Formspree / Mailchimp / Airtable.
 * See src/components/Waitlist.jsx for provider examples. Keep `email` as the
 * shared key so pay-preference lands on the same record as the sign-up.
 * ------------------------------------------------------------------------ */
async function submitEmail(payload) {
  // TODO(backend): replace with a real POST.
  console.log('[Shuffl v2 waitlist] new sign-up →', payload)
  await new Promise((r) => setTimeout(r, 550))
}

async function submitWillingnessToPay(payload) {
  // TODO(backend): PATCH/append to the record created above, keyed by email.
  console.log('[Shuffl v2 waitlist] willingness-to-pay →', payload)
  await new Promise((r) => setTimeout(r, 450))
}

// Pay STRUCTURE preference — qualitative on purpose. No invented prices (we've
// done no price research; a made-up number would just anchor the magnitude
// question). The trade-off is named in words so "pay on placement" isn't free.
const PAY_PREFS = [
  { id: 'upfront', title: 'Upfront', sub: 'Best price — one payment, you’re backing yourself.' },
  { id: 'plan', title: 'Payment plan', sub: 'Spread it monthly, for a small premium.' },
  { id: 'placement', title: 'Pay later, if it works', sub: 'Costs more — you only pay if you actually land a new role.' },
]

// Magnitude probe — WIDE, UNANCHORED bands (£0 → £5k+). The real price signal,
// asked first, spread kept broad on purpose (no anchor near a guessed number).
const PRICE_BANDS = [
  { id: 'lt250', label: 'Under £250' },
  { id: '250-1000', label: '£250–£1,000' },
  { id: '1000-2500', label: '£1,000–£2,500' },
  { id: '2500-5000', label: '£2,500–£5,000' },
  { id: '5000+', label: '£5,000+' },
  { id: 'placed-only', label: 'Only if I get placed' },
]

export default function WaitlistV2() {
  const [stage, setStage] = useState('idle')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [pref, setPref] = useState(null)
  const [band, setBand] = useState(null)
  const [wtpStatus, setWtpStatus] = useState('idle')

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function handleJoin(e) {
    e.preventDefault()
    if (!emailValid || status === 'loading') return
    setStatus('loading')
    try {
      await submitEmail({ email, source: 'landing-v2', ts: new Date().toISOString() })
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
      setStage('done')
    }
  }

  return (
    <section id="waitlist" className="scroll-mt-20 bg-neon py-20 text-noir md:py-28">
      <div className="wrap2">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatePresence mode="wait">
            {/* ------------------------------------------------------ IDLE */}
            {stage === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
              >
                <span className="eyebrow2 text-noir/70">
                  <span className="h-2 w-2 rounded-full bg-noir" />
                  Join the waitlist
                </span>
                <h2 className="display2 mt-6 text-[clamp(2.6rem,7vw,6rem)]">
                  Ready to make
                  <br />
                  your move?
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-noir/70">
                  Drop your email. We’ll tell you the moment the first cohort opens
                  — no spam, no 40-email “nurture sequence,” just the good stuff.
                </p>

                <form onSubmit={handleJoin} className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row">
                  <label htmlFor="email-v2" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-v2"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@wherever.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') setStatus('idle')
                    }}
                    className="h-[56px] flex-1 rounded-full border-2 border-noir bg-transparent px-6 font-medium text-noir placeholder-noir/40 focus:outline-none focus:ring-4 focus:ring-noir/20"
                  />
                  <button
                    type="submit"
                    disabled={!emailValid || status === 'loading'}
                    className="btn2-dark h-[56px] shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === 'loading' ? 'Sending…' : 'Join →'}
                  </button>
                </form>
                <p className="mt-4 h-5 text-sm font-medium">
                  {status === 'error' ? (
                    <span className="text-cobalt">Something broke — give it another go?</span>
                  ) : (
                    <span className="text-noir/50">
                      Free to join · Unsubscribe in one click · ~2 emails a month, tops
                    </span>
                  )}
                </p>
              </motion.div>
            )}

            {/* ---------------------------------------------------- JOINED */}
            {stage === 'joined' && (
              <motion.div
                key="joined"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
              >
                <span className="eyebrow2 text-noir/70">
                  <span className="h-2 w-2 rounded-full bg-cobalt" />
                  You’re on the list
                </span>
                <h2 className="display2 mt-5 text-[clamp(2.2rem,6vw,4.5rem)]">
                  One quick thing.
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-noir/70">
                  30 seconds, then we’ll leave you alone. It genuinely shapes what
                  we build.
                </p>

                {/* pay preference */}
                {/* WTP #1: magnitude — asked FIRST, unanchored (no number shown
                    anywhere above it). This is the real price signal. */}
                <div className="mt-9 text-left">
                  <p className="text-center font-anton text-xl uppercase tracking-tight md:text-2xl">
                    For the full Shuffl programme — placements, direction, routes
                    into employers — what feels{' '}
                    <span className="text-cobalt">fair</span> to pay?
                  </p>
                  <p className="mx-auto mt-2 max-w-md text-center text-sm font-medium text-noir/60">
                    No wrong answer — we genuinely haven’t set a price. Your gut is
                    the useful bit.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {PRICE_BANDS.map((b) => {
                      const active = band === b.id
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBand(active ? null : b.id)}
                          className={`rounded-full border-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-all ${
                            active
                              ? 'border-cobalt bg-cobalt text-bone'
                              : 'border-noir/25 text-noir/70 hover:border-noir'
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
                  <p className="text-center font-medium text-noir/80">
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
                          className={`flex flex-col border-2 p-5 text-left transition-all ${
                            active
                              ? 'border-noir bg-noir text-bone'
                              : 'border-noir/25 bg-transparent hover:border-noir'
                          }`}
                        >
                          <span className="font-anton text-lg uppercase tracking-tight">
                            {p.title}
                          </span>
                          <span
                            className={`mt-2 block text-sm leading-snug ${
                              active ? 'text-bone/70' : 'text-noir/60'
                            }`}
                          >
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
                    className="btn2-dark disabled:opacity-60"
                  >
                    {wtpStatus === 'loading' ? 'Saving…' : 'Lock it in →'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStage('done')}
                    className="text-sm font-bold uppercase tracking-wide text-noir/50 underline-offset-4 hover:text-noir hover:underline"
                  >
                    Skip — just keep my spot
                  </button>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------ DONE */}
            {stage === 'done' && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="eyebrow2 text-noir/70">
                  <span className="h-2 w-2 rounded-full bg-cobalt" />
                  All set
                </span>
                <h2 className="display2 mt-5 text-[clamp(2.4rem,6vw,5rem)]">
                  You’re in.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-noir/70">
                  We’ve got your spot
                  {pref || band ? ' — and your two cents, which matters more than you’d think' : ''}.
                  When the first cohort opens, you’ll be among the first to know.
                </p>
                <p className="mt-6 text-sm font-medium text-noir/50">
                  In the meantime — go easy on the Sunday-night dread. Help’s on the way.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
