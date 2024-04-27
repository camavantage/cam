"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { RxSun, RxMoon } from "react-icons/rx";
import { TbDeviceDesktop } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
     
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <RxSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <RxMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
     
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <RxSun className="mr-2" />
          Clair
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <RxMoon className="mr-2" />
          Sombre
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <TbDeviceDesktop className="mr-2" /> Système par défaut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
