/*
 * Client-side submission helper.
 *
 * Posts to the serverless function at /api/submit, which holds the Airtable
 * token server-side. There is deliberately no API key anywhere in this file —
 * anything shipped to the browser is public.
 *
 * NOTE ON LOCAL DEV: `npm run dev` runs Vite only, which does not execute the
 * /api function — so submissions are logged to the console instead of being
 * saved. To exercise the real Airtable write locally, run `vercel dev`.
 */
export async function postSubmission(payload) {
  if (import.meta.env.DEV) {
    console.log('[Shuffl dev] submission (not sent — run `vercel dev` to save) →', payload)
    await new Promise((r) => setTimeout(r, 400))
    return { ok: true, dev: true }
  }

  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`)
  }

  return res.json().catch(() => ({ ok: true }))
}
