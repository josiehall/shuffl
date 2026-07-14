import { Suit } from './primitives.jsx'
import { scrollToId } from './Nav.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper-deep/50">
      <div className="wrap py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-lime">
                <Suit suit="spade" className="h-4 w-4" />
              </span>
              <span className="font-display text-xl font-semibold">Shuffl</span>
            </div>
            <p className="mt-4 font-display text-lg italic text-ink-soft">
              Built for people who are mid-career, not mid-crisis.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <button
              onClick={() => scrollToId('waitlist')}
              className="btn-primary"
            >
              Deal me in →
            </button>
            <a
              href="mailto:hello@shuffl.example"
              className="text-sm text-ink-faint underline-offset-4 hover:text-ink hover:underline"
            >
              hello@shuffl.example
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-ink-faint sm:flex-row">
          <p>© {2026} Shuffl. All hands on deck.</p>
          <p className="flex items-center gap-2">
            Made with a full deck
            <Suit suit="heart" className="h-3.5 w-3.5 text-red" />
            <Suit suit="spade" className="h-3.5 w-3.5" />
            <Suit suit="diamond" className="h-3.5 w-3.5 text-red" />
            <Suit suit="club" className="h-3.5 w-3.5" />
          </p>
        </div>
      </div>
    </footer>
  )
}
