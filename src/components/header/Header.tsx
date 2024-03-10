import ThemeMenu from "./ThemeMenu";

export default function Header() {
  return (
    <div className="bg-transparent w-full flex flex-row">
      <div className="grow"/>
      <ThemeMenu />
    </div>
  );
}
