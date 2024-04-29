import AboutSection from "@/components/home/sections/aboutSection";
import AccompanimentSection from "@/components/home/sections/accompanimentSection";
import ContactSection from "@/components/home/sections/contactSection";
import CoursesSection from "@/components/home/sections/coursesSection";
import HomeSection from "@/components/home/sections/homeSection";
import SloganSection from "@/components/home/sections/sloganSection";
import StrengthSection from "@/components/home/sections/strengthSection";
import TeacherSection from "@/components/home/sections/teacherSection";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <main className="">
      <section className="">
        <HomeSection />
      </section>
      <section className="bg-ws-background">
        <AboutSection />
      </section>
      <section className="">
        <CoursesSection />
      </section>
      <section className="">
        <TeacherSection />
      </section>
      <section className=" bg-ws-background">
        <StrengthSection />
      </section>
      <section className="bg-ws-background">
        <AccompanimentSection />
      </section>
      <section className="">
        <Suspense>
          <ContactSection />
        </Suspense>
      </section>
    </main>
  );
}
