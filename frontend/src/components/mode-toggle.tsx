// components/ui/ToggleThemeButton.tsx
import { DarkModeIcon } from "../icons/DarkModeIcon";
import { LightModeIcon } from "../icons/LightModeIcon";
import { useTheme } from "./theme-provider";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    // <Button
    //   variant="ghost"
    //   size="icon"
    //   onClick={toggleTheme}
    //   aria-label="Toggle Theme"
    // >
    //   {theme === "dark" ? (
    //      <SunIcon className="w-5 h-5 text-yellow-500" />
    //     <LightModeIcon/>
    //   ) : (
    //      <MoonIcon className="w-5 h-5 text-blue-500" />
    //     <DarkModeIcon/>
    //   )}
    // </Button>
    <button
      onClick={toggleTheme}
      className='flex items-center'
    >
      {theme === "dark" ? (
        // <SunIcon className="w-5 h-5 text-yellow-500" />
        <LightModeIcon/>
      ) : (
        // <MoonIcon className="w-5 h-5 text-blue-500" />
        <DarkModeIcon/>
      )}
    </button>
  );
};
