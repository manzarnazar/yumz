import { createContext, useContext } from "react";

export type ThemeType = "light" | "dark";
export type DirType = "ltr" | "rtl";

type ThemeContextType = {
  theme: ThemeType;
  direction: DirType;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  setDirection: (dir: DirType) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  direction: "ltr", // Default direction
  toggleDarkMode: () => {}, // Placeholder function
  isDarkMode: true,
  setDirection: () => {}, // Placeholder function
});
export const useTheme = () => useContext(ThemeContext);
