import {createTheme} from "@mui/material/styles";

/*  It customizes shadows, the primary color, and typography,
making buttons with no text transformation and a lighter font weight.*/

export const theme = createTheme({
    shadows: ["none"],
    palette: {
        primary: {
            main: "#4361ee",
        },
    },
    typography: {
        button: {
            textTransform: "none",
            fontWeight: 400,
        },
    },
});
