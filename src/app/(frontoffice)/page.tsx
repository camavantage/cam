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
      <section className="bg-white">
          <AboutSection />
        </section>
        <section className="bg-cam-green-800 ">
          <SloganSection />
        </section>
        <section className="bg-white">
          <CoursesSection />
        </section>
        <section className="bg-white">
          <TeacherSection />
        </section>
        <section className="bg-white">
          <StrengthSection />
        </section>
        <section className="bg-white">
          <AccompanimentSection />
        </section>
        <section className="bg-white">
          <ContactSection />
        </section>
    </main>
  );
}
