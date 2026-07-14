import { useEffect, useState } from 'react'

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const LINKS = [
  { id: 'how', label: 'How it works' },
  { id: 'teachers', label: 'For teachers' },
  { id: 'faq', label: 'FAQ' },
]

export default function NavV2() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // At the very top the nav floats over the dark hero → use light text.
  // Once scrolled onto the cream sections → solid bar + dark text.
  const dark = !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-noir/10 bg-bone/90 backdrop-blur-md' : 'border-b border-transparent'
      } ${dark ? 'text-bone' : 'text-noir'}`}
    >
      <nav className="wrap2 flex h-[68px] items-center justify-between">
        {/* Big bold wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-anton text-3xl uppercase leading-none tracking-tight md:text-[2rem]"
          aria-label="Shuffl — back to top"
        >
          SHUFFL<span className="text-neon">.</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="text-xs font-bold uppercase tracking-[0.16em] opacity-70 transition-opacity hover:opacity-100"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollToId('waitlist')}
            className={`${dark ? 'btn2-neon' : 'btn2-dark'} !px-5 !py-2.5`}
          >
            Join waitlist
          </button>
        </div>

        {/* Mobile CTA */}
        <button
          onClick={() => scrollToId('waitlist')}
          className={`${dark ? 'btn2-neon' : 'btn2-dark'} !px-4 !py-2.5 md:hidden`}
        >
          Join
        </button>
      </nav>
    </header>
  )
}
