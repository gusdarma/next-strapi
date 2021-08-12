const { colors } = require(`tailwindcss/defaultTheme`);

module.exports = {
    purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
    darkMode: false, // or "media" or "class"
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    md: "2rem",
                },
            },
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
    },
    variants: {
        extend: {},
    },
};
