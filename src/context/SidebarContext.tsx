import React, { createContext, useState, ReactNode } from "react";

interface ContextProps {
  isCollapsed: boolean;
  toggleSidebarcollapse: () => void;
}

const initialValue: ContextProps = { isCollapsed: false, toggleSidebarcollapse: () => {} };

const SidebarContext = createContext<ContextProps>(initialValue);

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isCollapsed, setCollapse] = useState<boolean>(false);

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
      {children}
    </SidebarContext.Provider>
  )
}

export { SidebarContext, SidebarProvider };
