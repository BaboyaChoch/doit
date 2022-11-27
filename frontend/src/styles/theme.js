import { createTheme } from "@mui/material";
import { COLORS } from "./colors";
const font = "Raleway,Roboto, Arial, sans-serif";

export const theme = createTheme({
  palette: {
    secondary: {
      main: COLORS.WHITE,
    },
    primary: {
      main: COLORS.BLUE,
    },
  },
  typography: {
    fontFamily: font,
  },
});
