const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'challenge': {
          purple: '#7B46F8',
          pink: '#FA51A2',
          orange: '#FD8616',
          green: '#BDF522',
          dark: '#1A1A1A',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-in-up': 'slideInUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FA51A2 0%, #7B46F8 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FD8616 0%, #FA51A2 50%, #7B46F8 100%)',
      }
    },
  },
  plugins: [],
}

module.exports = config