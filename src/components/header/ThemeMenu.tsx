"use client";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "../ui/menu";
import { Moon, Sun, SunMoon } from "lucide-react";
import dynamic from "next/dynamic";

const CurrentThemeSymbol = dynamic(() => import("./CurrentThemeSymbol"), {
  ssr: false,
});

export default function ThemeMenu() {
  const { setTheme } = useTheme();

  return (
    <MenuTrigger>
      <Button
        variant={"outline"}
        className={"rounded-full p-0 aspect-square"}
        aria-label="theme menu"
      >
        <CurrentThemeSymbol />
      </Button>
      <MenuPopover placement="bottom">
        <Menu onAction={(id) => setTheme(id as string)}>
          <MenuItem id={"system"} className="flex flex-row gap-2">
            <SunMoon /> System
          </MenuItem>
          <MenuItem id={"light"} className="flex flex-row gap-2">
            <Sun /> Light
          </MenuItem>
          <MenuItem id={"dark"} className="flex flex-row gap-2">
            <Moon />
            Dark
          </MenuItem>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  );
}
