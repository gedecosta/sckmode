/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Paleta Athledia Mountain Peak ─────────────────
        snow:     '#F4F6F8',
        ice:      '#E8EAED',
        fog:      '#D3D7DC',
        stone:    '#868E96',
        stoneDim: '#6B7176',
        slate:    '#495057',
        granite:  '#2A2E33',
        obsidian: '#141619',

        // Accent — Azul Glacial (3 tons pra contraste WCAG)
        glacier:       '#3BA3FF',  // fill / large display numbers
        'glacier-dim': '#1E6FB8',  // text on light bg
        'glacier-brt': '#67BBFF',  // text on dark bg
        'glacier-ink': '#041A2E',  // text sobre fill glacier

        // Semânticos
        success: '#5FAE7A',
        warn:    '#D4A640',
        danger:  '#D84C4C',

        // ── Compatibilidade (tokens antigos redirecionados) ─
        athledia: {
          bg:         '#F4F6F8',
          card:       '#FFFFFF',
          dark:       '#141619',
          slate:      '#495057',
          lightSlate: '#6B7176',
          accent:     '#F4F6F8',
        },
      },

      fontFamily: {
        serif:        ['RobotoSlab-Black', 'serif'],
        'serif-bold': ['RobotoSlab-Bold', 'serif'],
        sans:         ['System', 'sans-serif'],
        mono:         ['Menlo', 'monospace'],
      },

      fontSize: {
        'eyebrow':    ['10px', { letterSpacing: '2px',    lineHeight: '14px' }],
        'display':    ['40px', { letterSpacing: '-1.5px', lineHeight: '40px' }],
        'display-sm': ['22px', { letterSpacing: '-0.6px', lineHeight: '24px' }],
      },

      borderRadius: {
        xs:   '4px',
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '20px',
        '2xl': '24px',
        '3xl': '32px',
      },

      letterSpacing: {
        'tightest': '-1.5px',
        'tighter':  '-0.6px',
        'wide':     '1.4px',
        'wider':    '1.6px',
        'widest':   '2px',
      },
    },
  },
  plugins: [],
}
