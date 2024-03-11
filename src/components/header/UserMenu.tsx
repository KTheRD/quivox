"use client";
import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "next-auth";
import { signOut } from "@/lib/actions";
import { LogOut, User as User_icon } from "lucide-react";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Link } from "@/navigation";

export default function UserMenu({ user }: { user: User }) {
  return (
    <PopoverTrigger>
      <Button variant={"outline"} className={"rounded-full p-0 aspect-square"}>
        <Avatar>
          <AvatarImage
            height={50}
            width={50}
            src={user.image ?? ""}
            alt={user.name!}
          />
          <AvatarFallback className="bg-red-500">
            {user.name![0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Button>
      <Popover placement="bottom" className="flex flex-col gap-2 p-2 w-max">
        <div className="flex flex-col">
          {user.name}
          <div className="text-muted-foreground">{user.email}</div>
        </div>
        <Link href="/profile" className="w-full flex flex-row gap-2 hover:bg-accent hover:text-accent-foreground select-none rounded-sm px-2 py-1.5 transition-colors">
          <User_icon />
          Profile
        </Link>
        <Button
          variant="destructive"
          className="w-full flex flex-row gap-2"
          onPress={() => signOut()}
        >
          <LogOut />
          Sign out
        </Button>
      </Popover>
    </PopoverTrigger>
  );
}
