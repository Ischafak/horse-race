module.exports = {
  mode: 'layers',
  content: [
    './components/**/*.vue',
    './pages/*.vue',
    './node_modules/tw-elements/dist/js/**/*.js',
    './assets/css/**/*.{scss,css}',
    'node_modules/tailvue/dist/tailvue.es.js'
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      screens: {
        xs: '420px',
        mdv2: '992px'
      },
      borderRadius: {
        32: '32px'
      },
      boxShadow: {
        'muk-xs': '0px 1px 2px 0px rgba(10, 13, 18, 0.05)',
        'muk-sm': '0px 1px 3px 0px rgba(10, 13, 18, 0.10), 0px 1px 2px 0px rgba(10, 13, 18, 0.06)',
        'muk-md': '0px 4px 8px -2px rgba(10, 13, 18, 0.10), 0px 2px 4px -2px rgba(10, 13, 18, 0.06)',
        'muk-lg': '0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03)',
        'muk-xl': '0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03)',
        'muk-2xl': '0px 24px 48px -12px rgba(10, 13, 18, 0.18)',
        'muk-3xl': '0px 32px 64px -12px rgba(10, 13, 18, 0.14)'
      },

      colors: {

        brown: {
          50: '#efebe9',
          100: '#d7ccc8',
          200: '#bcaaa4',
          300: '#a1887f',
          400: '#8d6e63',
          500: '#795548', // klasik kahverengi
          600: '#6d4c41',
          700: '#5d4037',
          800: '#4e342e',
          900: '#3e2723'
        }

      },
      opacity: {
        12: '.12',
        16: '.16',
        56: '.56'
      },
      fontSize: {
        'muk-3xs': ['8px', { lineHeight: '12px' }],
        'muk-2xs': ['10px', { lineHeight: '12px' }],
        'muk-xs': ['12px', { lineHeight: '18px' }],
        'muk-sm': ['14px', { lineHeight: '20px' }],
        'muk-md': ['16px', { lineHeight: '24px' }],
        'muk-lg': ['18px', { lineHeight: '28px' }],
        'muk-xl': ['20px', { lineHeight: '30px' }],
        'dmuk-xs': ['24px', { lineHeight: '32px' }],
        'dmuk-sm': ['30px', { lineHeight: '38px' }],
        'dmuk-md': ['36px', { lineHeight: '44px', letterSpacing: '-0.72px' }],
        'dmuk-lg': ['48px', { lineHeight: '60px', letterSpacing: '-0.96px' }],
        'dmuk-xl': ['60px', { lineHeight: '72px', letterSpacing: '-1.2px' }],
        'dmuk-2xl': ['72px', { lineHeight: '90px', letterSpacing: '-1.44px' }]
      },
      spacing: {
        4.5: '18px',
        5.5: '22px',
        7.5: '31px',
        13: '52px',
        18: '72px',
        22: '88px',
        26: '102px',
        27: '106px',
        29: '116px',
        34: '132px',
        42: '168px',
        50: '202px'
      },
      inset: {
        1.75: '1.75px'
      },
      letterSpacing: {

      },
      borderWidth: {

      }
    }
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(gray|brand|purplelight|rose|orange|indigo|bluegray|bluelight|blue|purple|success|error|warning|primary|red|green|yellow|pink|teal|cyan|zinc|neutral|lime|amber|emerald|violet|sky|fuchsia|slate|stone|brown)/
    },
    {
      pattern: /col-span-\d/
    },
    {
      pattern: /grid-cols-\d/
    },
    {
      pattern: /^grid-cols-[1-9]$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /text-(muk|dmuk)-(3xs|2xs|xs|sm|md|lg|xl|2xl)/
    }
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin')
  ]
}
