module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
    },
    theme: {
        fill: (theme) => ({
            red: theme('colors.red.primary'),
        }),
        colors: {
            white: '#fff',
            blue: {
                medium: '#005c98',
            },
            black: {
                light: '#262626',
                faded: '00000059',
            },
            gray: {
                base: '#6161616',
                background: '#fafafa',
                primary: '#dbdbdb',
                700: '#374151',
            },

            red: {
                primary: '#ed4956',
            },
        },
    },
    variants: {
        display: ['group-hover'],
    },
};
