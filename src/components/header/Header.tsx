import LanguageMenu from "./LanguageMenu";
import ThemeMenu from "./ThemeMenu";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <div className="bg-transparent w-full flex flex-row">
      <div className="grow" />
      <div className="flex flex-row gap-2 p-2">
        <LanguageMenu />
        <ThemeMenu />
        <UserMenu />
      </div>
    </div>
  );
}
