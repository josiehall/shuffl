import { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Suit, isRedSuit } from './primitives.jsx'
import { scrollToId } from './Nav.jsx'

/* The hand you're currently holding — the careers you could deal yourself. */
const ROLES = [
  { id: 'teach', rank: 'K', suit: 'spade', label: 'Teacher' },
  { id: 'ux', rank: 'Q', suit: 'heart', label: 'UX Designer' },
  { id: 'found', rank: 'A', suit: 'diamond', label: 'Founder' },
  { id: 'pm', rank: 'J', suit: 'club', label: 'Product' },
  { id: '10', rank: '10', suit: 'heart', label: 'Data Analyst' },
]

function shuffled(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* A single face-up card, positioned in a fanned hand by its slot. */
function HandCard({ role, slot, count, dealt }) {
  const center = (count - 1) / 2
  const offset = slot - center
  const red = isRedSuit(role.suit)
  const ink = red ? 'text-red' : 'text-ink'

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-44 w-32 sm:h-52 sm:w-36"
      style={{ zIndex: slot, transformOrigin: '50% 130%' }}
      initial={{ opacity: 0, x: '-50%', y: '-10%', rotate: 0, scale: 0.9 }}
      animate={
        dealt
          ? {
              opacity: 1,
              x: `calc(-50% + ${offset * 3.4}rem)`,
              y: `calc(-50% + ${Math.abs(offset) * 0.9}rem)`,
              rotate: offset * 9,
              scale: 1,
            }
          : { opacity: 0, x: '-50%', y: '-10%', rotate: 0, scale: 0.9 }
      }
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      whileHover={{ y: `calc(-50% + ${Math.abs(offset) * 0.9 - 1.2}rem)`, scale: 1.04 }}
    >
      <div className="flex h-full w-full flex-col justify-between rounded-2xl border border-ink/15 bg-card px-3.5 py-3 shadow-card">
        <div className={`flex items-center gap-1 text-base font-bold leading-none ${ink}`}>
          <span className="font-display">{role.rank}</span>
          <Suit suit={role.suit} className="h-3.5 w-3.5" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Suit suit={role.suit} className={`h-9 w-9 ${ink}`} />
          <span className="mt-2 font-display text-base font-semibold leading-tight text-ink">
            {role.label}
          </span>
        </div>
        <div className={`flex rotate-180 items-center gap-1 self-end text-base font-bold leading-none ${ink}`}>
          <span className="font-display">{role.rank}</span>
          <Suit suit={role.suit} className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.div>
  )
}

function CareerHand({ order, dealt, onShuffle }) {
  return (
    <div className="relative">
      <div
        className="relative mx-auto h-72 w-full max-w-md cursor-pointer select-none sm:h-80"
        onClick={onShuffle}
        role="button"
        tabIndex={0}
        aria-label="Shuffle the hand"
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onShuffle()}
      >
        {order.map((role, i) => (
          <HandCard key={role.id} role={role} slot={i} count={order.length} dealt={dealt} />
        ))}
      </div>

      <div className="mt-2 flex justify-center">
        <button
          onClick={onShuffle}
          className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card/70 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
        >
          <span className="text-base transition-transform duration-500 group-hover:rotate-180">
            ♺
          </span>
          Shuffle the deck
        </button>
      </div>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const [order, setOrder] = useState(ROLES)
  const [dealt, setDealt] = useState(false)

  const doShuffle = useCallback(() => {
    setDealt(false)
    // brief gather, then re-fan
    setTimeout(() => {
      setOrder((o) => shuffled(o))
      setDealt(true)
    }, 180)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setDealt(true), reduce ? 0 : 250)
    return () => clearTimeout(t)
  }, [reduce])

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pb-24">
      {/* decorative floating suits */}
      <Suit
        suit="diamond"
        className="pointer-events-none absolute -left-6 top-40 h-24 w-24 rotate-12 text-red/10"
      />
      <Suit
        suit="club"
        className="pointer-events-none absolute right-6 bottom-10 h-20 w-20 -rotate-12 text-ink/[0.06]"
      />

      <div className="wrap grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-8">
        {/* Copy */}
        <div className="relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              Mid-career work experience
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 font-display text-[2.7rem] font-semibold leading-[0.98] tracking-tight text-balance sm:text-6xl md:text-[4.1rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Reshuffle your career{' '}
            <span className="relative whitespace-nowrap italic text-red">
              without
              <svg
                className="absolute -bottom-1 left-0 w-full text-lime"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8c40-6 80-6 120-3s60 4 76-1"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            blowing up your life.
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty md:mx-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Shuffl gives experienced professionals a safe, structured way to
            test a different path — through real, hands-on placements. Call it
            work experience for grown-ups. No quitting blind, no going back to
            square one, no pretending your last decade never happened.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <button
              onClick={() => {
                doShuffle()
                setTimeout(() => scrollToId('waitlist'), 220)
              }}
              className="btn-primary w-full sm:w-auto"
            >
              Deal me in →
            </button>
            <button onClick={() => scrollToId('how')} className="btn-ghost w-full sm:w-auto">
              See how it works
            </button>
          </motion.div>

          <motion.p
            className="mt-5 text-sm text-ink-faint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Free to join · First cohort forming now · For the curious, not the reckless
          </motion.p>
        </div>

        {/* The shuffling hand */}
        <motion.div
          className="relative z-0"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <CareerHand order={order} dealt={dealt} onShuffle={doShuffle} />
        </motion.div>
      </div>
    </section>
  )
}
