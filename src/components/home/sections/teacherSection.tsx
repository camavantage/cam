import Image from "next/image";
import AcademicOutlineIcon from "../../icons/academicOulineIcon";
import UsersIcon from "../../icons/usersIcon";
import TrophyIcon from "../../icons/trophyIcon";
import SunIcon from "../../icons/sunIcon";
import s from "@/styles/Home.module.scss";

const TeacherSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 max-w-5xl mx-auto px-4 pb-10">
      <div className="">
        <Image
          src="/assets/images/enseignant-benjamin.jpg"
          className=""
          alt="Benjamin avantage"
          height={512}
          width={512}
        />
      </div>
      <div className="md:pt-32">
        <h4 className="font-bold text-xl">Fondateur</h4>
        <p className="text-gray-600 mt-2">
          En choisissant notre centre de formation, vous êtes assurés d&apos;un
          enseignement de qualité et d&apos;une proximité avec des formateurs
          passionnés, qui vous transmettront leur savoir et savoir-faire tournés
          vers votre épanouissement et réussite. Vivre le présent!
        </p>
        <div className="flex space-x-2 my-5">
          <Image
            src="/assets/images/benjamin-avantage.jpg"
            alt="Benjamin Katembo Kamala"
            height={244}
            width={244}
            className="h-12 w-12 rounded-full border-2 border-cam-yellow-900"
          />
          <div>
            <h6 className="font-bold">Benjamin Katembo Kamala</h6>
            <p className="text-gray-600">Fondateur et CEO</p>
          </div>
        </div>
        <div className={`grid grid-cols-2 gap-2 md:gap-4 mt-8  `}>
          <div className={`flex items-center space-x-2 ${s.cardRealization}`}>
            <AcademicOutlineIcon className="h-10 w-10  text-cam-green-800 " />
            <div>
              <h6 className="text-xl font-bold text-cam-yellow-900">6</h6>
              <p className="flex-1 text-xs">Formations</p>
            </div>
          </div>
          <div className={`flex items-center space-x-2 ${s.cardRealization}`}>
            <UsersIcon className="h-10 w-10 text-cam-green-800 " />
            <div>
              <h6 className="text-xl font-bold text-cam-yellow-900">78</h6>
              <p className="flex-1 text-xs">Etudiants</p>
            </div>
          </div>
          <div className={`flex items-center space-x-2 ${s.cardRealization}`}>
            <SunIcon className="h-10 w-10  text-cam-green-800" />
            <div>
              <h6 className="text-xl font-bold text-cam-yellow-900">18</h6>
              <p className="flex-1 text-xs f">Entrepreneurs</p>
            </div>
          </div>
          <div className={`flex items-center space-x-2 ${s.cardRealization}`}>
            <TrophyIcon className="h-10 w-10  text-cam-green-800" />
            <div>
              <h6 className="text-xl font-bold text-cam-yellow-900">1</h6>
              <p className="flex-1 text-xs ">Prix d&apos;excelence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSection;