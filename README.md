# Shuffl — waitlist landing page

A single-page, mobile-first demand-validation site for **Shuffl** — work
experience for grown-ups: a structured way for experienced professionals to test
a career change through real, hands-on placements.

The two things this page is built to test:
1. **Will people sign up?** → the email capture.
2. **Will people pay?** → the willingness-to-pay probe on the sign-up
   confirmation state (unanchored magnitude + pay-structure preference).

## Stack

- **Vite + React** — fast dev server, easy to edit.
- **Tailwind CSS** — styling via utility classes + a small design system in
  `tailwind.config.js` and `src/index.css`.
- **Framer Motion** — the hero reveal, scroll reveals, and the
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
section is its own component in [`src/components/v2/`](src/components/v2/):

| Section | File |
| --- | --- |
| Nav | `NavV2.jsx` |
| Hero | `HeroV2.jsx` |
| The problem | `ProblemV2.jsx` |
| How Shuffl works (4 steps) | `HowItWorksV2.jsx` |
| Shuffl for Teachers | `ForTeachersV2.jsx` |
| Who it's for | `WhoItsForV2.jsx` |
| **Waitlist + willingness-to-pay** | `WaitlistV2.jsx` |
| FAQ | `FAQV2.jsx` |
| Footer | `FooterV2.jsx` |

Most copy lives in a plain array near the top of each file (e.g. `PAINS`,
`STEPS`, `QA`, `PAY_PREFS`, `PRICE_BANDS`) — edit the strings and go.

## Connecting the form (the one TODO)

There is **no backend** yet. Both the email sign-up and the willingness-to-pay
answers are logged to the browser console and the UI advances optimistically.

To go live, open
[`src/components/v2/WaitlistV2.jsx`](src/components/v2/WaitlistV2.jsx) and replace
the two functions marked `TODO(backend)`:

- `submitEmail(payload)` — the waitlist sign-up. `payload = { email, source, ts }`.
- `submitWillingnessToPay(payload)` — the pricing probe. `payload = { email,
  payPreference, fairPrice, ts }`.

Drop in a Formspree / Mailchimp / Airtable request. Keep `email` as the shared
key so pay-preference lands on the same record as the sign-up.

## Design notes

- **Fonts:** Anton (display caps) + Archivo (body), loaded in `index.html`.
- **Palette:** near-black `noir` + warm `bone`, with pops of neon yellow and
  cobalt blue — defined in `tailwind.config.js`.
- **Tone:** bold, monochromatic, high-contrast; big `SHUFFL` wordmark; card/deal
  motifs deliberately kept out. Respects `prefers-reduced-motion`.
