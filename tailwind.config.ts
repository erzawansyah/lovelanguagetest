import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      heading: 'Baloo Paaji 2',
      body: 'Inter',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: '#C24756',
          light: '#ECC6CA',
          dark: '#602027'
        },
        secondary: {
          DEFAULT: '#7496EC',
          light: '#D0E0F5',
          dark: '#2E4C8C'
        },
        accent: {
          DEFAULT: '#CAE812',
          light: '#F0F5C0',
          dark: '#8C9C2E'
        },
        base: {
          DEFAULT: '#344F6F',
          light: '#B0BECF',
          dark: '#1E2A3F'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
