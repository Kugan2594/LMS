import { useRoutes } from "react-router-dom";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { CssBaseline } from "@mui/material";

import ThemeProviderWrapper from "./components/atoms/ThemeProvider";
import PublicRoute from "./routes/PublicRoute";
import routes from "./routes";
import { useSelector } from "react-redux";

const App = () => {
  const privatecontent = useRoutes(routes);
  const publiccontent = useRoutes(PublicRoute);
  const auth = useSelector((state: any) => state.auth);
  return (
    <ThemeProviderWrapper>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {auth ? privatecontent : publiccontent}
      </LocalizationProvider>
    </ThemeProviderWrapper>
  );
};
export default App;
