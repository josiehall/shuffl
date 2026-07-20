/*
 * Vercel serverless function — the only place the Airtable token lives.
 *
 * The browser POSTs here; this function adds the secret server-side and
 * forwards to Airtable. The token is NEVER shipped to the client. Do not move
 * these values into `VITE_`-prefixed vars — Vite bundles those into the
 * browser, which would expose the token to anyone who opens DevTools.
 *
 * Required environment variables (set in Vercel → Settings → Environment
 * Variables, NOT in the repo):
 *   AIRTABLE_TOKEN    — personal access token with data.records:read + write
 *   AIRTABLE_BASE_ID  — the base id, e.g. appYixiuaxoEf5dI4
 */

const AIRTABLE_API = 'https://api.airtable.com/v0'

const TABLES = {
  waitlist: 'Waitlist',
  employer: 'Employers',
}

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

async function airtable(path, { token, method = 'GET', body }) {
  const res = await fetch(`${AIRTABLE_API}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Airtable ${res.status}: ${detail}`)
  }
  return res.json()
}

/* Find an existing Waitlist row by email so the pricing answers land on the
 * same record as the original sign-up, rather than creating a duplicate. */
async function findWaitlistRecord({ token, baseId, email }) {
  const safe = email.replace(/["\\]/g, '')
  const formula = encodeURIComponent(`{Email}="${safe}"`)
  const data = await airtable(
    `${baseId}/${encodeURIComponent(TABLES.waitlist)}?filterByFormula=${formula}&maxRecords=1`,
    { token },
  )
  return data.records?.[0] ?? null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.AIRTABLE_TOKEN
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!token || !baseId) {
    // Log server-side only — never echo config details back to the client.
    console.error('Missing AIRTABLE_TOKEN or AIRTABLE_BASE_ID')
    return res.status(500).json({ error: 'Server not configured' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' })
    }
  }
  body = body || {}

  const { type, email } = body

  if (!isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const now = new Date().toISOString()

  try {
    /* ---------------------------------------------- candidate sign-up */
    if (type === 'waitlist') {
      const existing = await findWaitlistRecord({ token, baseId, email })
      if (existing) {
        // Someone signing up twice shouldn't create a duplicate row.
        return res.status(200).json({ ok: true, id: existing.id, deduped: true })
      }

      const created = await airtable(`${baseId}/${encodeURIComponent(TABLES.waitlist)}`, {
        token,
        method: 'POST',
        body: {
          typecast: true,
          fields: {
            Email: email,
            Source: body.source || 'landing',
            Submitted: now,
          },
        },
      })
      return res.status(200).json({ ok: true, id: created.id })
    }

    /* ------------------------------------- willingness-to-pay answers */
    if (type === 'wtp') {
      const fields = {
        'Pay preference': body.payPreference || '',
        'Fair price': body.fairPrice || '',
      }

      const existing = await findWaitlistRecord({ token, baseId, email })

      if (existing) {
        await airtable(
          `${baseId}/${encodeURIComponent(TABLES.waitlist)}/${existing.id}`,
          { token, method: 'PATCH', body: { typecast: true, fields } },
        )
        return res.status(200).json({ ok: true, id: existing.id })
      }

      // Shouldn't normally happen, but never lose the answer.
      const created = await airtable(`${baseId}/${encodeURIComponent(TABLES.waitlist)}`, {
        token,
        method: 'POST',
        body: {
          typecast: true,
          fields: { Email: email, Source: body.source || 'landing', Submitted: now, ...fields },
        },
      })
      return res.status(200).json({ ok: true, id: created.id })
    }

    /* ------------------------------------------- employer interest */
    if (type === 'employer') {
      const created = await airtable(`${baseId}/${encodeURIComponent(TABLES.employer)}`, {
        token,
        method: 'POST',
        body: {
          typecast: true,
          fields: {
            Company: body.company || '',
            Email: email,
            Submitted: now,
          },
        },
      })
      return res.status(200).json({ ok: true, id: created.id })
    }

    return res.status(400).json({ error: 'Unknown submission type' })
  } catch (err) {
    console.error('[submit] failed:', err)
    return res.status(502).json({ error: 'Could not save submission' })
  }
}
