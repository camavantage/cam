import AboutSection from "@/components/home-sections/aboutSection";
import AccompanimentSection from "@/components/home-sections/accompanimentSection";
import CoursesSection from "@/components/home-sections/coursesSection";
import HomeSection from "@/components/home-sections/homeSection";
import SloganSection from "@/components/home-sections/sloganSection";
import StrengthSection from "@/components/home-sections/strengthSection";
import TeacherSection from "@/components/home-sections/teacherSection";
import { LatestArticles } from "@/components/latest-articles";

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
      <LatestArticles />
    </main>
  );
}
