import dynamic from "next/dynamic";

const ThemeMenu = dynamic(() => import("./ThemeMenu"), {ssr: false});

export default function Header() {
  return (
    <div className="bg-transparent w-full flex flex-row">
      <div className="grow"/>
      <ThemeMenu />
    </div>
  );
}
