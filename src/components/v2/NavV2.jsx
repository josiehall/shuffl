import { useEffect, useState } from 'react'

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const SECTION_LINKS = [
  { id: 'how', label: 'How it works' },
  { id: 'teachers', label: 'For teachers' },
  { id: 'faq', label: 'FAQ' },
]

/*
 * `page` tells the nav which page it's sitting on:
 *   'home'      → section links scroll in-page, CTA scrolls to the waitlist
 *   'employers' → section links link back to the homepage (/#id), CTA scrolls
 *                 to the employer interest form
 */
export default function NavV2({ page = 'home' }) {
  const [scrolled, setScrolled] = useState(false)
  const isHome = page === 'home'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // At the very top the nav floats over the dark hero → use light text.
  // Once scrolled onto the cream sections → solid bar + dark text.
  const dark = !scrolled

  const linkClass =
    'text-xs font-bold uppercase tracking-[0.16em] opacity-70 transition-opacity hover:opacity-100'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-noir/10 bg-bone/90 backdrop-blur-md' : 'border-b border-transparent'
      } ${dark ? 'text-bone' : 'text-noir'}`}
    >
      <nav className="wrap2 flex h-[68px] items-center justify-between">
        {/* Wordmark — always returns to the homepage */}
        <a
          href="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="font-anton text-3xl uppercase leading-none tracking-tight md:text-[2rem]"
          aria-label="Shuffl — home"
        >
          SHUFFL<span className="text-neon">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {SECTION_LINKS.map((l) =>
            isHome ? (
              <button key={l.id} onClick={() => scrollToId(l.id)} className={linkClass}>
                {l.label}
              </button>
            ) : (
              <a key={l.id} href={`/#${l.id}`} className={linkClass}>
                {l.label}
              </a>
            ),
          )}

          {/* Cross-page tab */}
          {isHome ? (
            <a href="/employers" className={linkClass}>
              For employers
            </a>
          ) : (
            <a href="/" className={linkClass}>
              For career-changers
            </a>
          )}

          {isHome ? (
            <button
              onClick={() => scrollToId('waitlist')}
              className={`${dark ? 'btn2-neon' : 'btn2-dark'} !px-5 !py-2.5`}
            >
              Join waitlist
            </button>
          ) : (
            <button
              onClick={() => scrollToId('employer-form')}
              className={`${dark ? 'btn2-neon' : 'btn2-dark'} !px-5 !py-2.5`}
            >
              Register interest
            </button>
          )}
        </div>

        {/* Mobile: cross-page tab + CTA */}
        <div className="flex items-center gap-3 md:hidden">
          <a href={isHome ? '/employers' : '/'} className={linkClass}>
            {isHome ? 'Employers' : 'Candidates'}
          </a>
          <button
            onClick={() => scrollToId(isHome ? 'waitlist' : 'employer-form')}
            className={`${dark ? 'btn2-neon' : 'btn2-dark'} !px-4 !py-2.5`}
          >
            {isHome ? 'Join' : 'Register'}
          </button>
        </div>
      </nav>
    </header>
  )
}
