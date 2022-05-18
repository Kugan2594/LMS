import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "../../../theme/base";
import { StylesProvider } from "@mui/styles";

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

export type componentProps = {
  children: React.ReactNode; // 👈️ type children
};

const ThemeProviderWrapper = (props: componentProps) => {
  const { children } = props;
  const curThemeName = localStorage.getItem("appTheme") || "PureLightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
