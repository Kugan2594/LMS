import { FC, useState, createContext } from "react";
import { componentProps } from "../components/atoms/ThemeProvider";
type SidebarContext = { sidebarToggle: any; toggleSidebar: () => void };

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider = (props: componentProps) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar }}>
      {props.children}
    </SidebarContext.Provider>
  );
};
