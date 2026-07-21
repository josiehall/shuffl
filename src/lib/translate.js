/*
 * Client helper for the LLM-written STAR answer.
 *
 * Returns a {s, t, a} object, or null if anything at all goes wrong — the
 * caller then falls back to the curated answer, so the page never breaks on a
 * failed or slow API call. No API key is involved here; the request goes to
 * /api/translate, which holds the key server-side.
 *
 * LOCAL DEV: `npm run dev` runs Vite only and does not execute /api functions,
 * so this returns null and you'll see the curated fallback. Run `vercel dev`
 * to exercise the real Claude call locally.
 */
export async function fetchStarAnswer(input) {
  if (import.meta.env.DEV) {
    console.log('[Shuffl dev] STAR translation skipped — run `vercel dev` for the live version')
    return null
  }

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    })
    if (!res.ok) return null

    const data = await res.json()
    const star = data?.star
    if (!star?.s || !star?.t || !star?.a) return null
    return star
  } catch {
    return null
  }
}
