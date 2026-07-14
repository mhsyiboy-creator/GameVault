import forms from '@tailwindcss/forms'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 35px rgba(147, 51, 234, 0.2)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(79, 70, 229, 0.22), transparent 28%), radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.16), transparent 24%)',
      },
    },
  },
  plugins: [forms],
}
