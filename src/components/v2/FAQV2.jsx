import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../primitives.jsx'
import { scrollToId } from './NavV2.jsx'

const QA = [
  {
    q: 'Do I have to quit my job to do this?',
    a: 'Nope. That’s the whole point. The placements are short and built to fit around a real, adult life — a job, a mortgage, a school run. You explore first, and only leap when you’ve actually seen what you’re leaping into.',
  },
  {
    q: 'What does it cost?',
    a: 'Straight answer: we’re still finalising it — which is partly what that cheeky pricing question after sign-up is about. It won’t be a fortune, and it won’t be free (free things rarely respect your time). Waitlisters help set it, and get first-cohort pricing.',
  },
  {
    q: 'Is this just coaching in a trench coat?',
    a: 'Fair suspicion. No. Coaching is talking about the work. Shuffl is doing the work — real, hands-on placements with real employers. There’s reflection in there too, but the centre of gravity is trying the actual job, not journaling about it.',
  },
  {
    q: 'What kind of placements are we talking about?',
    a: 'Real, hands-on exploration placements with vetted employers across a growing range of industries — the sort where you contribute to actual work, not photocopy and fetch coffee. We match them to the direction you land on in steps one and two.',
  },
  {
    q: 'I’m not a teacher. Am I allowed in?',
    a: 'Completely. Teachers are our starting wedge, not the whole club. If you’re experienced, mid-career and itching to mix it up, you’re exactly who we’re building for — get on the list.',
  },
  {
    q: 'Will my current employer find out?',
    a: 'Not from us. Exploring is discreet by default — you’re in control of who knows what, and when. No awkward LinkedIn notifications, no accidental reveals.',
  },
]

function Item({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-noir/15">
      <button onClick={onToggle} className="flex w-full items-center gap-4 py-6 text-left" aria-expanded={isOpen}>
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

export default function FAQV2() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="scroll-mt-20 bg-bone py-20 md:py-28">
      <div className="wrap2">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <span className="eyebrow2 text-cobalt">
                <span className="h-2 w-2 rounded-full bg-cobalt" />
                The obvious questions
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display2 mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">
                You’ve got
                <br />
                questions.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-noir/70">
                Still not sure? The waitlist is free and non-binding — the
                lowest-stakes move you’ll make all year.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <button onClick={() => scrollToId('waitlist')} className="btn2-cobalt mt-6">
                Join the waitlist →
              </button>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border-t border-noir/15">
              {QA.map((item, i) => (
                <Item
                  key={i}
                  item={item}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
