import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

export default function CurrentThemeSymbol() {
  const { theme } = useTheme();

  switch (theme) {
    case "light":
      return <Sun />;
    case "dark":
      return <Moon />;
    default:
      return <SunMoon />;
  }
}
