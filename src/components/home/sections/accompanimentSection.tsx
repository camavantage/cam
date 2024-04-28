import Image from "next/image";
import PlusIcon from "../../icons/plusIcon";
import s from "@/styles/Home.module.scss";

const AccompanimentSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 max-w-5xl mx-auto px-4 pb-16">
     
      <div className=" md:pt-56 md:px-10">
        <h4 className="font-bold text-2xl">L&apos;encadrement CAM/AVANTAGE</h4>
        <div className="mt-5">
          <div className="flex items-center mb-5 space-x-5">
            <div className={`h-12 w-12 ${s.cardCheck}`}>
            <PlusIcon  className="h-6 w-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h6 className="text-sm">Vous êtes accompagné par un conseiller en formation tout au long de votre parcours</h6>
              <p></p>
            </div>
          </div>
          <div className="flex items-center mb-5 space-x-5">
            <div className={`h-12 w-12 ${s.cardCheck}`}>
              <PlusIcon className="h-6 w-6 text-cam-green-800" />
            </div>
            <div className="flex-1">
              <h6 className="text-sm">Nous vous aidons à organiser votre travail et à progresser dans votre formation</h6>
              <p></p>
            </div>
          </div>
          <div className="flex items-center mb-5 space-x-5">
            <div className={`h-12 w-12 ${s.cardCheck}`}>
            <PlusIcon className="h-6 w-6 text-cam-green-800" />
            
            </div>
            <div className="flex-1">
              <h6 className="text-sm">Vous avez la possibilité de poser des questions à tout moment et de publier des photos et vidéos de réalisations</h6>
              <p></p>
            </div>
          </div>
          <div className="flex items-center mb-5 space-x-5">
            <div className={`h-12 w-12 ${s.cardCheck}`}>
            <PlusIcon className="h-6 w-6 text-cam-green-800" />
            
            </div>
            <div className="flex-1">
              <h6 className="text-sm">En ligne vos professeurs répondent et commentent en direct vos questions</h6>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-center">
        <Image
          src="/assets/images/mkati.jpg"
          className={``}
          alt="Gateau felicitation avantage"
          height={512}
          width={512}
        />
      </div>
    </div>
  );
};

export default AccompanimentSection;
