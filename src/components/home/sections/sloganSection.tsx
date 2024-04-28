import AcademicIcon from "../academicIcon";

const SloganSection: React.FC = () => {
  return (
    <div className="flex items-center justify-center max-w-5xl mx-auto space-x-4 py-8 px-4 md:px-8  ">
      <div className="flex justify-center items-center h-20 w-20 rounded-full">
        <AcademicIcon className=" h-12 w-12 text-cam-green-800"/>
      </div>
      <div  className="flex-1">
        <p className="  font-pridi font-semibold">
          Vivre le présent!
        </p>
        <p className="">
          La passion du goût au service de la communauté
        </p>
      </div>
    </div>
  );
};

export default SloganSection;
