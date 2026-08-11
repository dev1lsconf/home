/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './App.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: 'var(--bg-void)',
        carbon: 'var(--bg-carbon)',
        graphite: 'var(--bg-graphite)',
        steel: 'var(--border-steel)',
        snow: 'var(--text-snow)',
        mist: 'var(--text-mist)',
        ash: 'var(--text-ash)',
        indigo: { DEFAULT: '#6366F1', deep: '#4F46E5' },
        cyan: { signal: '#22D3EE' },
        green: { growth: '#10B981' },
        amber: { pulse: '#F59E0B' },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-16px)' } },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      boxShadow: {
        glow: '0 0 40px rgba(99, 102, 241, 0.25)',
        'glow-lg': '0 0 60px rgba(99, 102, 241, 0.35)',
      },
    },
  },
  plugins: [],
};
