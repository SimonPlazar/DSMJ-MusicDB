import { createTheme } from '@mui/material/styles';

const presets = {
    minimal: {
        palette: {
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#ffffff',
                paper: '#f5f5f5',
            },
            backgroundSecondary: {
                default: '#f0f0f0',
                paper: '#e0e0e0',
            },
        },
        components: {
            Footer: {
                variant: 'simple',
            },
            Header: {
                variant: 'simple',
            },
        },
    },

    complex: {
        palette: {
            primary: {
                main: '#2196f3',
            },
            secondary: {
                main: '#ff4081',
            },
            background: {
                default: '#fafafa',
                paper: '#ffffff',
            },
            backgroundSecondary: {
                default: '#eeeeee',
                paper: '#e0e0e0',
            },
        },
        components: {
            Footer: {
                variant: 'complex',
            },
            Header: {
                variant: 'complex',
            },
        },
    },
};

const costumButtons = {
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
            },
        },
        variants: [
            // {
            //     props: { color: 'primary' },
            //     style: {
            //         backgroundColor: mergedOptions.palette.primary.main,
            //         color: '#ffffff',
            //         '&:hover': {
            //             backgroundColor: mergedOptions.palette.primary.dark,
            //         },
            //     },
            // },
            // {
            //     props: { color: 'secondary' },
            //     style: {
            //         backgroundColor: mergedOptions.palette.secondary.main,
            //         color: '#ffffff',
            //         '&:hover': {
            //             backgroundColor: mergedOptions.palette.secondary.dark,
            //         },
            //     },
            // },
            {
                props: { color: 'success' },
                style: {
                    backgroundColor: '#4caf50',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#45a049',
                    },
                },
            },
            {
                props: { color: 'error' },
                style: {
                    backgroundColor: '#f44336',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#d32f2f',
                    },
                },
            },
        ],
    },
}

const createCustomTheme = (preset = '', options = {}) => {
    // const presetTheme = presets[preset];
    const presetTheme = presets[preset] || {};

    // Merge preset with custom options
    const mergedOptions = {
        ...presetTheme,
        ...options,
        palette: {
            ...presetTheme.palette,
            ...options.palette,
        },
        components: {
            ...presetTheme.components,
            ...options.components,
        },
    };

    // Create the theme
    return createTheme({
        ...mergedOptions,
        components: {
            ...costumButtons,
            ...mergedOptions.components,
        },
    });
};

export { createCustomTheme };

