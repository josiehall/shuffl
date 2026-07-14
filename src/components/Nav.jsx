import { useEffect, useState } from 'react'
import { Suit } from './primitives.jsx'

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const LINKS = [
  { id: 'how', label: 'How it works' },
  { id: 'teachers', label: 'For teachers' },
  { id: 'faq', label: 'FAQ' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink/10 bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="wrap flex h-16 items-center justify-between">
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2"
          aria-label="Shuffl — back to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-lime transition-transform duration-300 group-hover:-rotate-12">
            <Suit suit="spade" className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Shuffl
          </span>
        </button>

        {/* Links */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-card hover:text-ink"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollToId('waitlist')}
          className="btn-primary !px-5 !py-2.5 !text-sm"
        >
          Join the waitlist
        </button>
      </nav>
    </header>
  )
}
