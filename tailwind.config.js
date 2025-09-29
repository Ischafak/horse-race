import forms from '@tailwindcss/forms'

export default {
  mode: 'layers',
  content: [
    './components/**/*.vue',
    './pages/*.vue',
    './node_modules/tw-elements/dist/js/**/*.js',
    './assets/css/**/*.{scss,css}',
    'node_modules/tailvue/dist/tailvue.es.js'
  ],
  theme: {
    extend: {
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
        brand: {
          25: '#F5FAFF',
          50: '#EFF8FF',
          100: '#D1E9FF',
          200: '#B2DDFF',
          300: '#84CAFF',
          400: '#53B1FD',
          500: '#2E90FA',
          600: '#1570EF',
          700: '#175CD3',
          800: '#1849A9',
          900: '#194185'
        },
        success: {
          25: '#F6FEF9',
          50: '#ECFDF3',
          100: '#D1FADF',
          200: '#A6F4C5',
          300: '#6CE9A6',
          400: '#32D583',
          500: '#12B76A',
          600: '#039855',
          700: '#027A48',
          800: '#05603A',
          900: '#054F31'
        },
        error: {
          25: '#FFFBFA',
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          300: '#FDA29B',
          400: '#F97066',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A271A'
        },
        warning: {
          25: '#FFFCF5',
          50: '#FFFAEB',
          100: '#FEF0C7',
          200: '#FEDF89',
          300: '#FEC84B',
          400: '#FDB022',
          500: '#F79009',
          600: '#DC6803',
          700: '#B54708',
          800: '#93370D',
          900: '#7A2E0E'
        },
        purplelight: {
          25: '#FAFAFF',
          50: '#F4F3FF',
          100: '#EBE9FE',
          200: '#D9D6FE',
          300: '#BDB4FE',
          400: '#9B8AFB',
          500: '#7A5AF8',
          600: '#6938EF',
          700: '#5925DC',
          800: '#4A1FB8',
          900: '#3E1C96'
        },
        bluegray: {
          25: '#FCFCFD',
          50: '#F8F9FC',
          100: '#EAECF5',
          200: '#D5D9EB',
          300: '#AFB5D9',
          400: '#717BBC',
          500: '#4E5BA6',
          600: '#3E4784',
          700: '#363F72',
          800: '#293056',
          900: '#101323'
        },
        bluelight: {
          25: '#F5FBFF',
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#B9E6FE',
          300: '#7CD4FD',
          400: '#36BFFA',
          500: '#0BA5EC',
          600: '#0086C9',
          700: '#026AA2',
          800: '#065986',
          900: '#0B4A6F'
        },
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
      borderWidth: {
        1: '1px'
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
    forms
  ]
}
