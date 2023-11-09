import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NightModeToggle from "./component/NightModeToggle";
import TextFieldButton from "./component/TextFieldButton";
import Dark from "./themes/Dark";
import Light from "./themes/Light";
import Recommend from "./component/Recommend";

// Define the main App component
function App() {
  // State for controlling dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode
  const changeMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <ThemeProvider theme={darkMode ? createTheme(Dark) : createTheme(Light)}>
        <CssBaseline>
          <HelmetProvider>
            <Helmet>
              <title>Cocktail Repo</title>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Helmet>

            {/* Night mode toggle */}
            <h5 className="align-right">
              <Box m={1} p={1}>
                <NightModeToggle
                  DarkModeSwitch={darkMode}
                  ChangeModeSwitch={changeMode}
                />
              </Box>
            </h5>

            {/* Main header */}
            <h4 className="align_center">🍸🍺🥃 Cocktail Repo 🥃🍺🍸</h4>

            {/* Recommendation component */}
            <Recommend />

            {/* Text field and button */}
            <TextFieldButton
              TextFieldVariant="filled"
              ButtonVariant="outlined"
              size="small"
            />
            {/* Footer */}
          </HelmetProvider>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
