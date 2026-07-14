import { motion } from 'framer-motion'
import { scrollToId } from './NavV2.jsx'

const TICKER = [
  'TRY BEFORE YOU COMMIT',
  'REAL PLACEMENTS',
  'REAL EMPLOYERS',
  'NO BLIND LEAPS',
  'WORK EXPERIENCE FOR GROWN-UPS',
]

const line = {
  hidden: { opacity: 0, y: '110%' },
  show: (i) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 0.7, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Line({ i, children, className = '' }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        custom={i}
        variants={line}
        initial="hidden"
        animate="show"
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function HeroV2() {
  return (
    <section className="relative overflow-hidden bg-noir text-bone">
      {/* atmospheric wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-cobalt/30 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-neon/10 blur-[120px]" />
      </div>

      <div className="wrap2 relative flex min-h-[92vh] flex-col justify-center pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow2 text-neon">
            <span className="h-2 w-2 rounded-full bg-neon" />
            Mid-career work experience
          </span>
        </motion.div>

        <h1 className="display2 mt-7 text-[clamp(3.2rem,11vw,10rem)]">
          <Line i={0}>Try the job</Line>
          <Line i={1}>
            before you{' '}
          </Line>
          <Line i={2}>
            <span className="text-neon">quit</span> the job.
          </Line>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-xl text-lg leading-relaxed text-bone/75 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Shuffl is <span className="font-semibold text-bone">work experience for grown-ups</span> —
            real, hands-on placements that let experienced professionals test a new
            career before they commit. No quitting blind. No starting at the bottom.
          </motion.p>

          <motion.div
            className="flex shrink-0 flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button onClick={() => scrollToId('waitlist')} className="btn2-neon">
              Join the waitlist →
            </button>
            <button
              onClick={() => scrollToId('how')}
              className="btn2-outline text-bone hover:!text-noir"
            >
              How it works
            </button>
          </motion.div>
        </div>
      </div>

      {/* neon ticker strip */}
      <div className="relative flex overflow-hidden border-y-2 border-neon bg-neon py-3 text-noir">
        <div className="flex shrink-0 animate-marquee items-center gap-6 pr-6">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-6 whitespace-nowrap font-anton text-lg uppercase tracking-wide">
              {t}
              <span className="text-noir/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
