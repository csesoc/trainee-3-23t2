import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      colors: {
        "ll-dark-pink": "#E85D75",
        "ll-black": "#000000",
        "ll-pink": "#F8C1C9",
        "ll-red": "#911B1B",
        "ll-white": "#FFFFFF",
        "ll-light-pink": "#FCDADA",
        "ll-gray": "#D9D9D9",
      },
    },
  },
  plugins: [],
}
export default config
