import { scrollToId } from './NavV2.jsx'

export default function FooterV2() {
  return (
    <footer className="bg-noir text-bone">
      {/* Giant wordmark band */}
      <div className="wrap2 border-b border-bone/15 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-md font-anton text-2xl uppercase leading-tight tracking-tight text-bone/80">
            Built for people who are mid-career, not mid-crisis.
          </p>
          <div className="flex flex-col items-start gap-3">
            <button onClick={() => scrollToId('waitlist')} className="btn2-neon">
              Join the waitlist →
            </button>
            <a
              href="mailto:hello@shuffl.example"
              className="text-sm font-bold uppercase tracking-wide text-bone/50 underline-offset-4 hover:text-neon hover:underline"
            >
              hello@shuffl.example
            </a>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="wrap2 overflow-hidden py-8">
        <div className="font-anton text-[clamp(4rem,20vw,18rem)] uppercase leading-none tracking-tighter text-bone">
          SHUFFL<span className="text-neon">.</span>
        </div>
      </div>

      <div className="wrap2 flex flex-col items-center justify-between gap-3 border-t border-bone/15 py-6 text-xs font-bold uppercase tracking-[0.14em] text-bone/50 sm:flex-row">
        <p>© 2026 Shuffl · All rights reserved</p>
        <p>Reshuffle responsibly.</p>
      </div>
    </footer>
  )
}
