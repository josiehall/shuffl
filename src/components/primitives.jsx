import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ *
 * Suit glyphs — the little card motif we reuse tastefully throughout. *
 * ------------------------------------------------------------------ */
const SUIT_PATHS = {
  spade:
    'M16 3c-3.6 4.1-8.5 6.8-8.5 11.7 0 3 2.4 4.9 5 4.9 1.3 0 2.4-.5 3-1.4-.3 2.9-1.3 4.6-3 6h9c-1.7-1.4-2.7-3.1-3-6 .6.9 1.7 1.4 3 1.4 2.6 0 5-1.9 5-4.9C24.5 9.8 19.6 7.1 16 3z',
  heart:
    'M16 27C7 20.5 4 15.9 4 11.4 4 7.9 6.7 5.5 10 5.5c2.3 0 4.4 1.2 6 3.6 1.6-2.4 3.7-3.6 6-3.6 3.3 0 6 2.4 6 5.9 0 4.5-3 9.1-12 15.6z',
  diamond: 'M16 2l11 14-11 14L5 16 16 2z',
  club:
    'M16 3.5a5 5 0 00-3.9 8.1A5 5 0 108.5 20a5 5 0 004.5-2.8c-.2 2.4-1.1 3.9-2.6 5.3h11.2c-1.5-1.4-2.4-2.9-2.6-5.3A5 5 0 0023.5 20a5 5 0 00-3.6-8.4A5 5 0 0016 3.5z',
}

const RED_SUITS = new Set(['heart', 'diamond'])

export function Suit({ suit = 'spade', className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={SUIT_PATHS[suit]} />
    </svg>
  )
}

export function isRedSuit(suit) {
  return RED_SUITS.has(suit)
}

/* ------------------------------------------------------------------ *
 * PlayingCard — a face-up card used for the "career" hand + accents.  *
 * ------------------------------------------------------------------ */
export function PlayingCard({ rank = 'A', suit = 'spade', label, className = '' }) {
  const red = isRedSuit(suit)
  const ink = red ? 'text-red' : 'text-ink'
  return (
    <div
      className={`relative flex flex-col justify-between rounded-card border border-ink/15 bg-card px-3.5 py-3 shadow-card ${className}`}
    >
      {/* top-left index */}
      <div className={`flex items-center gap-1 text-sm font-bold leading-none ${ink}`}>
        <span className="font-display">{rank}</span>
        <Suit suit={suit} className="h-3 w-3" />
      </div>

      {/* centre — the "career" this card represents */}
      <div className="flex flex-1 flex-col items-center justify-center py-2 text-center">
        <Suit suit={suit} className={`h-7 w-7 ${ink}`} />
        {label && (
          <span className="mt-2 font-display text-[0.95rem] font-semibold leading-tight text-ink">
            {label}
          </span>
        )}
      </div>

      {/* bottom-right index (rotated, like a real card) */}
      <div className={`flex items-center gap-1 self-end text-sm font-bold leading-none ${ink} rotate-180`}>
        <span className="font-display">{rank}</span>
        <Suit suit={suit} className="h-3 w-3" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Reveal — staggered fade-up as sections scroll into view.           *
 * ------------------------------------------------------------------ */
export function Reveal({ children, delay = 0, className = '', y = 22 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
