import Image from "next/image";

import s from "@/styles/Home.module.scss";
import { RiWhatsappFill } from "react-icons/ri";
import AcademicIcon from "../academicIcon";

const HomeSection: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2  max-w-6xl mx-auto pt-8 pb-10 md:py-10 px-4">
      <div className="flex flex-col justify-end md:px-20 md:pb-10">
        <small className="font-bold text-2xl">Depuis 2020,</small>
        <p className=" text-gray-500 mb-10">
          nous redonnons le plaisir d&apos;
          <span className="overline font-bold text-cam-green-900">
            apprendre
          </span>{" "}
          et d&apos;exercer les{" "}
          <span className="overline font-bold text-cam-green-900">métier</span>s
          de la main dans nos locaux et en ligne grâce aux outils numériques.
        </p>
        <div className="flex items-center space-x-4 mb-6">
          <AcademicIcon className="h-16 w-16 md:h-20 md:w-20 text-cam-green-800 inline-block" />
          <div className="border-2 h-16 border-cam-green-800" />
          <div>
            <small className="text-xs">CAM/AVANTAGE</small>
            <p className=" font-medium">
              <span className=" ">C</span>entre d&apos;
              <span className=" ">A</span>pprentisage et des{" "}
              <span className=" ">M</span>étiers <span className=" ">A</span>
              vantage
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center relative mt-6">
        <a
          href="https://wa.me/+243826776661"
          target="_blank"
          rel="noreferrer"
          className="absolute place-self-center z-20"
        >
          <div className="flex flex-col justify-center  p-4 items-center bg-cam-gray bg-opacity-95 hover:bg-blackground rounded-full h-20 w-20 ">
            <RiWhatsappFill className="h-4 w-4 text-green-500" />
            <p className="text-center text-xs font-bold text-muted-foreground">
              Whatsapp
            </p>
          </div>
        </a>
        <Image
          src="/assets/images/cam-image-home-illustration.jpg"
          alt="Avantage illustration image"
          height={512}
          width={512}
          className={`h-64 w-64 md:h-96 rounded-full md:w-96 ${s.img}`}
        />
      </div>
    </div>
  );
};

export default HomeSection;
