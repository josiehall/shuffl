import { useState } from 'react'

/*
 * Side-by-side comparison view. Each version renders in its own iframe
 * (pointing at ?v=1 and ?v=2 on the same origin) so they stay fully
 * independent — scroll, animations and state don't leak between them.
 */
const PANELS = [
  { v: '1', label: 'V1 · Card / deal', accent: '#E23B26' },
  { v: '2', label: 'V2 · Bold mono', accent: '#1E2CE0' },
]

export default function Compare() {
  const [solo, setSolo] = useState(null) // null | '1' | '2'

  const shown = solo ? PANELS.filter((p) => p.v === solo) : PANELS

  return (
    <div className="flex h-screen flex-col bg-neutral-900 text-white">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
        <div className="flex items-baseline gap-3">
          <span className="font-anton text-lg uppercase tracking-tight">Shuffl</span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">
            Brand comparison
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide">
          <button
            onClick={() => setSolo(null)}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              solo === null ? 'bg-white text-neutral-900' : 'text-white/60 hover:text-white'
            }`}
          >
            Side by side
          </button>
          <button
            onClick={() => setSolo('1')}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              solo === '1' ? 'bg-white text-neutral-900' : 'text-white/60 hover:text-white'
            }`}
          >
            V1 only
          </button>
          <button
            onClick={() => setSolo('2')}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              solo === '2' ? 'bg-white text-neutral-900' : 'text-white/60 hover:text-white'
            }`}
          >
            V2 only
          </button>
        </div>
      </div>

      {/* Panels */}
      <div
        className={`grid flex-1 gap-px overflow-hidden bg-white/10 ${
          shown.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {shown.map((p) => (
          <div key={p.v} className="flex min-h-0 flex-col bg-neutral-900">
            <div
              className="flex shrink-0 items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: p.accent }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: p.accent }}
              />
              {p.label}
              <a
                href={`?v=${p.v}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-white/40 underline-offset-2 hover:text-white hover:underline"
              >
                Open full ↗
              </a>
            </div>
            <iframe
              title={`Shuffl version ${p.v}`}
              src={`?v=${p.v}`}
              className="min-h-0 flex-1 border-0 bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
