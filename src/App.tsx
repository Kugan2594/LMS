import { useRoutes } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CssBaseline } from "@mui/material";

import "./App.css";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const publiccontent = useRoutes(PublicRoute);
  return <>{publiccontent}</>;
}

export default App;
