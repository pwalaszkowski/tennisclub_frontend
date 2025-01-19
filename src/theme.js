import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4CAF50', // Główny zielony
        },
        secondary: {
            main: '#FFD700', // Złoty
        },
        background: {
            default: '#F5F5F5', // Jasny szary dla tła
        },
    },
    typography: {
        fontFamily: 'Roboto, Playfair Display, Arial, sans-serif',
        h1: {
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
        },
        h2: {
            fontFamily: 'Playfair Display, serif',
        },
        button: {
            textTransform: 'none', // Wyłączenie automatycznego CAPS LOCK w przyciskach
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    padding: '10px 20px',
                },
            },
        },
    },
});

export default theme;
