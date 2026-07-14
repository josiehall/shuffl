/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm "paper" base — the felt the cards are dealt on
        paper: '#F3E9D6',
        'paper-deep': '#ECDFC6',
        card: '#FFFCF4', // the face of a card
        ink: '#1A1512', // near-black, warm
        'ink-soft': '#4B4038', // body text
        'ink-faint': '#8A7E70', // captions
        red: '#E23B26', // ♥ / ♦ — the punchy accent
        'red-deep': '#C22C1B',
        lime: '#CDEB4B', // the wild card / pop
        'lime-deep': '#B4D62F',

        // --- v2 (bold / monochromatic) palette ---
        noir: '#0B0A09', // near-black base
        bone: '#F2EFE6', // warm off-white
        neon: '#E4FB00', // electric neon yellow pop
        'neon-deep': '#CDE100',
        cobalt: '#1E2CE0', // vivid cobalt blue pop
        'cobalt-deep': '#1622B8',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        // v2
        anton: ['Anton', 'Impact', 'sans-serif'],
        archivo: ['Archivo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 40px -18px rgba(26,21,18,0.45)',
        'card-sm': '0 8px 22px -12px rgba(26,21,18,0.4)',
        pop: '6px 6px 0 0 #1A1512',
        'pop-red': '6px 6px 0 0 #E23B26',
      },
      borderRadius: {
        card: '18px',
      },
      keyframes: {
        'deal-in': {
          '0%': { opacity: '0', transform: 'translateY(24px) rotate(-6deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      animation: {
        'deal-in': 'deal-in 0.6s cubic-bezier(0.22,1,0.36,1) both',
        marquee: 'marquee 26s linear infinite',
        wiggle: 'wiggle 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
}
