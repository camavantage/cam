"use client";
import Link from "next/link";
import { IoIosHeart } from "react-icons/io";
import { Logo } from "../header/logo";
import { siteConfig } from "@/lib/data/site";
import { docsConfig } from "@/lib/data/menu";
import { MobileLink } from "../header/mobile-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogoWithtext } from "../header/logo-with-text";

const date = new Date();
const formData = z.object({
  email: z.string().email(),
});

export function SiteFooter() {
  const form = useForm<z.infer<typeof formData>>({
    resolver: zodResolver(formData),
  });

  const onSubmit = (data: z.infer<typeof formData>) => {};
  return (
    <footer className=" bg-ws-background p-6 lg:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 md:gap-5">
        <div className=" lg:col-span-2">
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader className="px-0">
              <CardTitle className="flex space-x-4 items-center lg:items-start">
                <Link href="/" className="">
                  <LogoWithtext className="h-20 w-20 " />
                </Link>
                <div>
                  <span className="font-bold text-[18px] inline-block">
                    Vivre le présent
                  </span>
                  <CardDescription>
                    La passion du goût au service de la communauté.
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              {/* <div>
                <p className="text-sm text-muted-foreground">
                  Pour ne rien
                    rater, inscrivez-vous à notre{" "}
                    <span className=" font-bold">newsletter</span>!
                </p>
                <Form {...form}>
                  <form
                    className="relative mt-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                {...field}
                                type="email"
                                placeholder="Newsletter"
                                className="flex-1 pr-12 rounded-full"
                              />
                              <Button
                                type="submit"
                                className={cn(
                                  "absolute bg-transparent right-0 rounded-l-none rounded-r-full "
                                )}
                                variant="outline"
                              >
                                S&apos;inscrire
                              </Button>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div> */}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader className="px-0">
              <CardTitle className=" text-[18px]">Liens rapides</CardTitle>
              <CardDescription>
                <div className="flex flex-col space-y-3">
                  {docsConfig.mainNav?.map(
                    (item) =>
                      item.href && (
                        <MobileLink
                          key={item.href}
                          href={item.href}
                          // onOpenChange={setOpen}
                        >
                          {item.title}
                        </MobileLink>
                      )
                  )}
                </div>
              </CardDescription>
            </CardHeader>
            {/* <CardContent className="px-0"></CardContent> */}
          </Card>
        </div>
        <div>
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader className="px-0">
              <CardTitle className=" text-[18px]">Contacts</CardTitle>
              <CardDescription>
                <ul>
                  <li>+243826776661</li>
                  <li>+243977778829</li>
                  <li>contact@cam-avantage.com</li>
                </ul>
              </CardDescription>
            </CardHeader>
            {/* <CardContent className="px-0"></CardContent> */}
          </Card>
        </div>
        <div>
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader className="px-0">
              <CardTitle className=" text-[18px]">Adresses</CardTitle>
              <CardDescription>
                Nord-Kivu, Butembo, com. Kimemi, Q. Vutsundo, cel. Mutsunga,
                N⁰89
              </CardDescription>
            </CardHeader>
            {/* <CardContent className="px-0"></CardContent> */}
          </Card>
        </div>
      </div>
      <div className="px-4 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Made with <IoIosHeart className=" inline text-[#ff0000]" /> from DRC
        </p>
        <p className="text-sm text-muted-foreground">
          © {date.getFullYear()} {siteConfig.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
