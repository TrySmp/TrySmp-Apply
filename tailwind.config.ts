import type {Config} from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    // 50: '#fdf4f4',   // Lightest - barely pink
                    // 100: '#fbe9e9',  // Very light pink
                    // 200: '#f8d7d7',  // Light pink
                    // 300: '#f1baba',  // Soft pink
                    // 400: '#e8a6a6',  // Medium pink
                    // 500: '#E19898',  // Base color - soft rose
                    // 600: '#c77e7e',  // Darker rose
                    // 700: '#a66868',  // Deep rose
                    // 800: '#875454',  // Very dark rose
                    // 900: '#6f4545',  // Almost brown
                    // 950: '#3a2424',  // Darkest shade
                    50: '#f4f8fd',   // Lightest - barely blue
                    100: '#e9f1fb',  // Very light blue
                    200: '#d7e4f8',  // Light blue
                    300: '#bacff1',  // Soft blue
                    400: '#a6bde8',  // Medium blue
                    500: '#98afe1',  // Base color - soft sky blue
                    600: '#7e97c7',  // Darker sky blue
                    700: '#687ea6',  // Deep blue
                    800: '#546987',  // Very dark blue
                    900: '#45576f',  // Almost navy
                    950: '#242f3a',  // Darkest shade
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            keyframes: {
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                floatSlow: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                floatSlower: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(30px)' },
                },
                floatSlowest: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-40px)' },
                },
            },
            animation: {
                gradientShift: 'gradientShift 8s ease infinite',
                floatSlow: 'floatSlow 12s ease-in-out infinite',
                floatSlower: 'floatSlower 16s ease-in-out infinite',
                floatSlowest: 'floatSlowest 20s ease-in-out infinite',
                'pulse-slow': 'pulse 8s ease-in-out infinite',
                fadeIn: 'fadeIn 0.8s ease forwards',
            },
            minHeight: {
                'screen-adjusted': 'calc(100vh - 2rem - 2rem)', // full height - padding top - padding bottom
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
}

export default config;
