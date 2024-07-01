import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserRoutes from "./routes/UserRoutes";
import 'react-toastify/dist/ReactToastify.css';

import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
          </Routes>
          <ToastContainer />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
