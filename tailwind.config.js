/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    400: 'rgb(var(--brand-400) / <alpha-value>)',
                    500: 'rgb(var(--brand-500) / <alpha-value>)',
                    600: 'rgb(var(--brand-600) / <alpha-value>)',
                },
                surface: {
                    900: '#05050a',
                    800: '#0a0a0f',
                    700: '#11111a',
                }
            },
        },
    },
    plugins: [],
}
