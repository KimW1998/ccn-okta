import { createContext, useState } from "react";

export type Theme = {
  fontFamily: string;
  colors: {
    backgroundColor: string;
    textColor: string;
    toolbarBackgroundColor: string;
  };
};

export const initialTheme = {
  fontFamily: "sans-serif",
  colors: {
    backgroundColor: "white",
    textColor: "#00c",
    toolbarBackgroundColor: "#555",
  },
};

export const secondTheme = {
  fontFamily: "sans-serif",
  colors: {
    backgroundColor: "green",
    textColor: "black",
    toolbarBackgroundColor: "Yellow",
  },
};

export const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({
  theme: initialTheme,
  toggle: () => {},
});

export function ThemeProvider(props: { children?: React.ReactNode }) {
  const [theme, setTheme] = useState(initialTheme);

  const toggle = () => {
    if (theme === initialTheme) {
      setTheme(secondTheme);
    } else setTheme(initialTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
