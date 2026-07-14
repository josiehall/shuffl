# Shuffl — waitlist landing page

A single-page, mobile-first demand-validation site for **Shuffl** — mid-career
work experience: a structured way for experienced professionals to test a
career change through hands-on exploration placements.

The two things this page is built to test:
1. **Will people sign up?** → the email capture (`Waitlist`).
2. **Will people pay?** → the willingness-to-pay probe on the sign-up
   confirmation state.

## Two brand versions (compare them)

There are two complete design directions living side by side, switched by a URL
query param (a tiny router in [`src/main.jsx`](src/main.jsx) — no dependency):

| URL | What you get |
| --- | --- |
| `/` or `/?v=1` | **V1 — card / deal branding.** Warm cream, Fraunces serif, the shuffling-hand hero. |
| `/?v=2` | **V2 — bold / monochromatic.** Near-black + bone, huge Anton caps, big `SHUFFL` wordmark, pops of neon yellow + cobalt blue. Card motifs stripped back. |
| `/?compare` | **Both, side by side** in iframes — with V1-only / V2-only toggles. Best for eyeballing them together. |

- V1 lives in [`src/App.jsx`](src/App.jsx) + [`src/components/`](src/components/).
- V2 lives in [`src/AppV2.jsx`](src/AppV2.jsx) + [`src/components/v2/`](src/components/v2/).
- The comparison harness is [`src/Compare.jsx`](src/Compare.jsx).

Both versions share the same copy and the same waitlist + willingness-to-pay
logic — only the visual language differs.

## Stack

- **Vite + React** — fast dev server, easy to edit.
- **Tailwind CSS** — styling via utility classes + a small design system in
  `tailwind.config.js` and `src/index.css`.
- **Framer Motion** — the shuffle interaction, scroll reveals, and the
  confirmation-state transitions.

## Run it

```bash
npm install
npm run dev      # local dev server (usually http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing copy

Copy is deliberately colocated with each section so you can iterate fast. Every
section is its own component in [`src/components/`](src/components/):

| Section | File |
| --- | --- |
| Nav | `Nav.jsx` |
| Hero + shuffle animation | `Hero.jsx` |
| The problem | `Problem.jsx` |
| How Shuffl works (4 steps) | `HowItWorks.jsx` |
| Shuffl for Teachers | `ForTeachers.jsx` |
| Who it's for | `WhoItsFor.jsx` |
| **Waitlist + willingness-to-pay** | `Waitlist.jsx` |
| FAQ | `FAQ.jsx` |
| Footer | `Footer.jsx` |

Most copy lives in a plain array near the top of each file (e.g. `PAINS`,
`STEPS`, `QA`, `PAY_PREFS`, `PRICE_BANDS`) — edit the strings and go.

## Connecting the form (the one TODO)

There is **no backend** in v1. Both the email sign-up and the willingness-to-pay
answers are logged to the browser console and the UI advances optimistically.

To go live, open [`src/components/Waitlist.jsx`](src/components/Waitlist.jsx) and
replace the two functions marked `TODO(backend)`:

- `submitEmail(payload)` — the waitlist sign-up. `payload = { email, source, ts }`.
- `submitWillingnessToPay(payload)` — the pricing probe. `payload = { email,
  payPreference, fairPrice, ts }`.

Drop in a Formspree / Mailchimp / Airtable request (examples are in the comment
block). Keep `email` as the shared key so pay-preference lands on the same
record as the sign-up.

## Design notes

- **Fonts:** Fraunces (display) + Instrument Sans (body), loaded in `index.html`.
- **Palette:** warm "paper" cream, deep ink, a punchy card-red, and a lime
  "wild card" accent — defined in `tailwind.config.js`.
- **Signature interaction:** the hero holds a fanned hand of "career" cards that
  deal in on load and reshuffle on click / on the *Deal me in* CTA. Respects
  `prefers-reduced-motion`.
