/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a1428',
        surface: '#0f1e35',
        surfaceElevated: '#132a4a',
        border: '#1a3a52',
        borderLight: '#2a4a62',

        neon: {
          orange: '#ff6b00',
          orangeLight: '#ff8c33',
          orangeGlow: 'rgba(255, 107, 0, 0.4)',
          blue: '#3b82f6',
          blueLight: '#60a5fa',
          purple: '#7c3aed',
          purpleLight: '#a78bfa',
          green: '#10b981',
          red: '#ef4444',
          yellow: '#fbbf24',
        },

        soccer: {
          pitch: '#065f46',
          pitchLight: '#10b981',
          pitchDark: '#042f2e',
          gold: '#fbbf24',
          silver: '#e5e7eb',
          white: '#ffffff',
          line: '#d1d5db',
        },

        accent: {
          primary: '#fbbf24',
          secondary: '#10b981',
          tertiary: '#ff6b00',
        },

        text: {
          primary: '#ffffff',
          secondary: '#a1aec4',
          muted: '#6b7788',
          inverse: '#0a1428',
        },
      },

      fontFamily: {
        display: ['var(--font-clash)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space)', 'monospace'],
      },

      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['1.5rem', { lineHeight: '1.3' }],
        'h3': ['1.25rem', { lineHeight: '1.4' }],
        'h4': ['1.125rem', { lineHeight: '1.4' }],
      },

      boxShadow: {
        'glow': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-lg': '0 0 40px rgba(16, 185, 129, 0.4)',
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.3)',
        'glow-orange': '0 0 20px rgba(255, 107, 0, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'field': '0 0 30px rgba(16, 185, 129, 0.2)',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #fbbf24 0%, #ff8c33 100%)',
        'gradient-field': 'linear-gradient(135deg, #10b981 0%, #065f46 100%)',
        'gradient-surface': 'linear-gradient(180deg, #132a4a 0%, #0f1e35 100%)',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'field-pattern': 'linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px)',
      },

      backdropBlur: {
        'xs': '2px',
      },

      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '28px',
      },

      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-ball': 'bounce-ball 2s ease-in-out infinite',
        'slide-left': 'slide-left 0.4s ease-out',
        'slide-right': 'slide-right 0.4s ease-out',
        'goal-flash': 'goal-flash 0.6s ease-out',
      },

      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'bounce-ball': {
          '0%, 100%': { transform: 'translateY(0px)', boxShadow: '0 0 0 rgba(251, 191, 36, 0.5)' },
          '50%': { transform: 'translateY(-12px)', boxShadow: '0 8px 20px rgba(251, 191, 36, 0.4)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'goal-flash': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
          '100%': { opacity: '0', transform: 'scale(1)' },
        },
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}