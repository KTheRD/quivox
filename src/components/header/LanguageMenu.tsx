"use client";
import { localeCountryCodes, localeNames, locales } from "@/i18n";
import { Button } from "../ui/button";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "../ui/menu";
import ReactCountryFlag from "react-country-flag";
import { useLocale } from "next-intl";
import { usePathname } from "@/navigation";

export default function LanguageMenu() {
  const currentPath = usePathname();
  return (
    <MenuTrigger>
      <Button
        variant={"outline"}
        className={"rounded-full p-0 aspect-square"}
        aria-label="language menu"
      >
        {
          <ReactCountryFlag
            countryCode={
              localeCountryCodes[useLocale() as (typeof locales)[number]]
            }
          />
        }
      </Button>
      <MenuPopover placement="bottom">
        <Menu>
          {locales.map((l) => (
            <MenuItem
              href={`${l}/${currentPath}`}
              key={l}
              id={l}
              className="flex flex-row gap-2"
            >
              <ReactCountryFlag countryCode={localeCountryCodes[l]} />
              {localeNames[l]}
            </MenuItem>
          ))}
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  );
}
