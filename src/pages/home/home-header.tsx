import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import learningBro from "../../assets/learning-bro.svg"

export default function HomeHeader() {
  const navigate = useNavigate();
  function handleStartClick() {
    navigate("/resume-making");
  }
  return (
    <div className="flex w-full flex-col items-center justify-center py-2 lg:flex-row lg:bg-gradient-to-r lg:from-blue-500 lg:to-blue-300 lg:px-[140px]">
      <div className="flex w-full items-center justify-center lg:w-[50%]">
        <img src={learningBro} className="w-[90%]" alt="" />
      </div>
      <div className="font-poppins flex w-full flex-col items-center justify-center bg-blue-400 px-5 py-5 lg:w-[50%] lg:bg-transparent">
        <h1 className="text-center text-[30px] font-[700] text-[#0f172a] lg:text-[38px]">
          Make a resume for free
        </h1>
        <p className="mt-[10px] text-center text-[15px] text-white lg:text-[18px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus vero
          mollitia
        </p>
        <div className="mt-4">
          <Button text="Start" onClick={handleStartClick} />
        </div>
      </div>
    </div>
  );
}
