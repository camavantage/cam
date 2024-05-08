import Image from "next/image";
import s from "@/styles/Home.module.scss";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { courses } from "@/lib/data/courses";
import Link from "next/link";

const CoursesSection: React.FC = () => {
  return (
    <div className=" max-w-5xl mx-auto py-10 px-4">
      <Card className=" border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className=" text-2xl font-bold">Nos formations</CardTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <CardDescription className="lg:col-span-2 text-base ">
              Apprenez un métier essentiel à votre rythme avec nos formations en
              ligne accessibles partout et tout le temps ou directement dans nos
              locaux.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 pt-6">
            {courses.map((course) => (
              <Link href={`/courses#${course.name}`} key={course.id}>
                <div className={`${s.courseCard}`}>
                  <Image
                    src={course.mediaItem.sourceUrl}
                    alt={course.mediaItem.alt}
                    height={512}
                    width={512}
                  />
                  <h6 className="">{course.name}</h6>
                  <p>{course.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesSection;
