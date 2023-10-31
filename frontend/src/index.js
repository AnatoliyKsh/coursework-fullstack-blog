import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import "./index.scss";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import store from "./redux/store"

/* folder with index in react app with navigation, themes, and the main App */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </BrowserRouter>
);
