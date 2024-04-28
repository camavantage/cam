import AboutSection from "@/components/home/sections/aboutSection";
import AccompanimentSection from "@/components/home/sections/accompanimentSection";
import ContactSection from "@/components/home/sections/contactSection";
import CoursesSection from "@/components/home/sections/coursesSection";
import HomeSection from "@/components/home/sections/homeSection";
import SloganSection from "@/components/home/sections/sloganSection";
import StrengthSection from "@/components/home/sections/strengthSection";
import TeacherSection from "@/components/home/sections/teacherSection";

export default function HomePage() {
  return (
    <main className="">
      <section className="">
        <HomeSection />
      </section>
      <section className="">
          <AboutSection />
        </section>
        <section className="">
          <SloganSection />
        </section>
        <section className="">
          <CoursesSection />
        </section>
        <section className="">
          <TeacherSection />
        </section>
        <section className="">
          <StrengthSection />
        </section>
        <section className="">
          <AccompanimentSection />
        </section>
        <section className="">
          <ContactSection />
        </section>
    </main>
  );
}
