// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            // Custom colors (sesuaikan dengan brand yearbook kamu)
            colors: {
                primary: {
                    50: '#fef7f0',
                    100: '#fef0e1',
                    200: '#fce1c7',
                    300: '#f9c8a1',
                    400: '#f4a868',
                    500: '#f5f0ea', // Main primary - beige
                    600: '#d4a574',
                    700: '#b3855a',
                    800: '#926a47',
                    900: '#784f3b',
                },
                secondary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3557A2', // Main secondary - blue
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                accent: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#2A358F', // Main accent - purple
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                },
            },

            // Custom fonts
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },

            // Custom spacing
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },

            // Custom animations
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },

            // Custom shadows
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
        },
    },
    plugins: [
        // Tambahkan plugins jika perlu
        // require('@tailwindcss/typography'),
        // require('@tailwindcss/forms'),
    ],
};
