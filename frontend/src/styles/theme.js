import { createTheme } from "@mui/material";
import { Colors } from "./colors"
const font = "Roboto, Arial, sans-serif";

export const theme = createTheme({
    palette: {
        secondary: {
            main: Colors.WHITE
        },
        primary: {
            main: Colors.BLUE,
        },
    },
    typography: {
        fontFamily: font,
    },
});