import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "rgb(3, 125, 214)", // Blue
      light: "rgb(171, 217, 229)",
      dark: "rgb(105, 145, 156)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#5c6bc0", // Orange
      light: "rgb(124, 136, 204)",
      dark: "rgb(64, 74, 134)",
      contrastText: "#fff",
    },
  },
});
