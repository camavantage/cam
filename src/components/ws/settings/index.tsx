"use client";

import { TooltipWrap } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { PiGear } from "react-icons/pi";
import { HelpSettings } from "./help";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TbCloudUpload, TbDeviceDesktop, TbQuestionMark } from "react-icons/tb";
import { GeneralSettings } from "./general";
import { StorageSettings } from "./storage";
import React from "react";
import { AppType } from "@/lib/types";

type SettingsSheetProps = {
  generalSettings: AppType | null;
};

export const SettingsSheet: React.FC<SettingsSheetProps> = ({
  generalSettings,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <TooltipWrap content="Paramètres" side="right">
          <Button variant="ghost" size="icon" className={cn("relative")}>
            <PiGear className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </TooltipWrap>
      </SheetTrigger>
      <SheetContent side="left" className=" bg-ws-background">
        <SheetHeader>
          <SheetTitle className=" text-left">Paramètres</SheetTitle>
          <SheetDescription className="text-left">
            Personnalisez votre compte en ajustant vos informations selon vos
            besoins et vos désirs. Après chaque modifications n&apos;oubliez pas
            d&apos;<span className="text-black">enregistrer</span>.
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="general" className="pt-2">
          <TabsList className=" w-full justify-start px-0 bg-transparent">
            <TabsTrigger value="general">
              <TbDeviceDesktop className="mr-2" />
              Général
            </TabsTrigger>
            <TabsTrigger value="storage">
              <TbCloudUpload className="mr-2" /> Stockage
            </TabsTrigger>
            <TabsTrigger value="help">
              <TbQuestionMark className="mr-2" /> Assistance
            </TabsTrigger>
          </TabsList>
          <ScrollArea className=" h-[calc(100vh-172px)] pb-5">
            <TabsContent value="general">
              <GeneralSettings settings={generalSettings} />
            </TabsContent>
            <TabsContent value="storage">
              <StorageSettings />
            </TabsContent>
            <TabsContent value="help">
              <HelpSettings />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
