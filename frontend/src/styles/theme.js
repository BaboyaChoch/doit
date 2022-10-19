import { createTheme } from "@mui/material";

const font = "Raleway, Roboto, Arial, sans-serif";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#253042',
        },
        secondary: {
            main: '#71552a',
        },
    },
    typography: {
        fontFamily: font,
    },
});