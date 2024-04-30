import Image from "next/image";
import s from "@/styles/Home.module.scss";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const courses = [
  {
    id: "1",
    name: "Pâtisserie",
    description: "",
    mediaItem: {
      sourceUrl: "/assets/images/course-illustrations/fouet.png",
      alt: "Fouet pâtesserie illustration",
      name: "",
    },
  },
  {
    id: "2",
    name: "Boulangerie",
    description: "",
    mediaItem: {
      sourceUrl: "/assets/images/course-illustrations/boulanger.png",
      alt: "Boulanger illustration",
      name: "",
    },
  },
  {
    id: "3",
    name: "Charcuterie",
    description: "",
    mediaItem: {
      sourceUrl: "/assets/images/course-illustrations/saucisson.png",
      alt: "Charcuterie avantage illustration",
      name: "",
    },
  },
  {
    id: "4",
    name: "Confiserie",
    description: "",
    mediaItem: {
      sourceUrl: "/assets/images/course-illustrations/jus-de-fruit.png",
      alt: "Jus de fruits avantage illustration",
      name: "",
    },
  },
  {
    id: "5",
    name: "Hôtellerie",
    description: "",
    mediaItem: {
      sourceUrl: "/assets/images/course-illustrations/des-lits.png",
      alt: "lits d'hotel avantage illustration",
      name: "",
    },
  },
  {
    id: "6",
    name: "Restaurantion",
    description: "",
    mediaItem: {
      sourceUrl: "/assets/images/course-illustrations/serveur.png",
      alt: "Serveur avantage illustration",
      name: "",
    },
  },
];

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
              <div key={course.id} className={`${s.courseCard}`}>
                <Image
                  src={course.mediaItem.sourceUrl}
                  alt={course.mediaItem.alt}
                  height={512}
                  width={512}
                />
                <h6 className="">{course.name}</h6>
                <p>{course.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesSection;
