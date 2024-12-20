import { useEffect, useState } from "react";
import { DarkModeIcon } from "../../icons/DarkModeIcon";
import { LightModeIcon } from "../../icons/LightModeIcon";

export const ToggleButton = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    const rootElement = document.documentElement;
    if (theme === "dark") {
      rootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      rootElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  return (
      <button onClick={toggleTheme}>
        {theme === "dark" ? <LightModeIcon/> : <DarkModeIcon/>}
      </button>
  );
};
