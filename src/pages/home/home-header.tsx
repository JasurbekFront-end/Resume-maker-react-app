import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

export default function HomeHeader() {
  const navigate=useNavigate()
  function handleStartClick() {
    navigate("/resume-making")
  }
  return (
    <div className="flex w-full flex-col items-center justify-center py-2">
      <div className="flex w-full items-center justify-center">
        <img src="/src/assets/learning-bro.svg" className="w-[90%]" alt="" />
      </div>
      <div className="font-poppins flex w-full flex-col items-center justify-center bg-blue-400 px-5 py-5">
        <h1 className="text-[30px] font-[700] text-[#0f172a] text-center">
          Make a resume for free
        </h1>
        <p className="mt-[10px] text-center text-[15px] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus vero
          mollitia
        </p>
        <div className="mt-4"><Button text="Start" onClick={handleStartClick}/></div>
      </div>
    </div>
  );
}
