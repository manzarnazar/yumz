import { createContext, useContext, useState } from "react";

export type ThemeType = "light" | "dark";
export type DirType = "ltr" | "rtl";

type ThemeContextType = {
  theme: ThemeType;
  direction: DirType;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  setDirection: (dir: DirType) => void;
};

// Default values for the context
export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark", // Default theme is dark
  direction: "ltr", // Default direction is LTR
  toggleDarkMode: () => {},
  isDarkMode: true, // Default to dark mode
  setDirection: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>("dark"); // Default is dark theme
  const [direction, setDirectionState] = useState<DirType>("ltr");

  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const setDirection = (dir: DirType) => {
    setDirectionState(dir);
    document.documentElement.dir = dir; // Update the document direction
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        direction,
        toggleDarkMode,
        isDarkMode: theme === "dark",
        setDirection,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
