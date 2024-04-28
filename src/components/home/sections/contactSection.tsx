import Image from "next/image";
import s from "@/styles/Home.module.scss";
import { RiWhatsappFill } from "react-icons/ri";

const ContactSection: React.FC = () => {
  return (
    <div className={`max-w-5xl mx-auto py-12 md:py-20 px-4`}>
      <div
        className={`p-4 md:p-8 text-sm md:text-base ${s.about} flex flex-col items-center rounded-3xl`}
      >
        <div className="flex justify-center items-center border-2 border-cam-green-800 rounded-full">
          <Image
            src="/assets/images/client.png"
            alt=""
            height={128}
            width={128}
            className="h-14 w-14  text-white"
          />
        </div>
        <p className="text-center max-w-xl mt-2">
          Vous pouvez suivre une formation en apprentissage 100% théorie en
          ligne et 100% pratique en entreprise
        </p>
        <h1 className="font-bold text-center text-xl mt-2"></h1>
        <a
          href="https://wa.me/+243826776661"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 bg-cam-green-900 text-white font-bold px-3 py-1 rounded-full mt-2"
        >
          <RiWhatsappFill className="h-8 w-8" />
          <span>Nous contacter</span>
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
