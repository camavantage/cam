import Image from "next/image";
import CheckIcon from "../../icons/checkIcon";
import s from "@/styles/Home.module.scss";

const StrengthSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 max-w-5xl mx-auto px-4 pb-16">
      <div className=" md:pt-32 md:px-10">
        <h4 className="font-bold text-xl">Pourquoi se former avec CAM-A?</h4>
        <div className="mt-5">
          <div className="flex items-center mb-5 space-x-5">
            <div className={`h-12 w-12 ${s.cardCheck}`}>
            <Image src="/assets/images/strengths/education.png" alt="" height={128} width={128} className="h-6 w-6 text-cam-green-800" />
            </div>
            <div className="flex-1">
              <h6 className="text-sm">Profitez de l&apos;accompagnement personnalisé des professionnels reconnus et passionnés</h6>
              <p></p>
            </div>
          </div>
          <div className="flex items-center mb-5 space-x-5">
            <div className={`h-12 w-12 ${s.cardCheck}`}>
              <Image src="/assets/images/strengths/certificat.png" alt="" height={128} width={128} className="h-6 w-6 text-cam-green-800" />
            </div>
            <div className="flex-1">
              <h6 className="text-sm">Vous aurez droit à un diplôme d&apos;état officiel un certificat d&apos;aptitude professionnel national reconnu</h6>
              <p></p>
            </div>
          </div>
          <div className="flex items-center mb-5 space-x-5">
            <div className={`h-12 w-12 ${s.cardCheck}`}>
            <Image src="/assets/images/strengths/patron.png" alt="" height={128} width={128} className="h-6 w-6 text-cam-green-800" />
            
            </div>
            <div className="flex-1">
              <h6 className="text-sm">Trouvez un emploi rapidement ou créez votre entreprise avec nos formations.</h6>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-center">
        <Image
          src="/assets/images/pizza.jpg"
          className={`${s.imgCake} h-64 w-64 rounded-full`}
          alt="Gateau felicitation avantage"
          height={512}
          width={512}
        />
      </div>
    </div>
  );
};

export default StrengthSection;