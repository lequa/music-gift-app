/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pure-white': '#FFFFFF',
        'soft-cream': '#FEFCF7',
        'elegant-gold': '#E6B800',
        'warm-gray': '#4A5568',
        'light-blue': '#E3F2FD',
        'soft-lavender': '#F3E5F5',
        'mint-green': '#E8F5E8',
        'pastel-peach': '#FFF3E0',
        'charcoal-gray': '#2D3748',
        'success-green': '#38A169',
        'alert-coral': '#E53E3E',
      },
      fontFamily: {
        'sans': ['var(--font-noto-sans-jp)', 'system-ui', '-apple-system', 'sans-serif'],
        'noto': ['var(--font-noto-sans-jp)', 'sans-serif'],
        'poppins': ['var(--font-poppins)', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 40px rgba(0, 0, 0, 0.08)',
        'gold': '0 4px 20px rgba(230, 184, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #E6B800 0%, #FFD700 100%)',
        'gradient-sunrise': 'linear-gradient(135deg, #FFF3E0 0%, #E3F2FD 100%)',
      },
    },
  },
  plugins: [],
}