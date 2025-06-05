import { useNavigate } from "react-router-dom";

interface HiddenMenuMobileProps {
  toggleMenu: () => void;
}
export default function Navbar({ toggleMenu }: HiddenMenuMobileProps) {
  const navigate = useNavigate();
  function handleNavigate(pathname:string) {
    navigate(`/${pathname}`);
  }

  return (
    <div className="font-poppins relative z-10 border-b border-b-gray-300">
      <div className="flex h-[80px] w-full items-center justify-between px-[20px]">
        <div
          className="flex items-end justify-center gap-[15px] lg:cursor-pointer"
          onClick={()=>{handleNavigate("home")}}
        >
          <img src="/src/assets/logo.png" alt="" />
          <h3 className="font-poppins -mb-[5px] font-[700] text-blue-500">
            Resume Making
          </h3>
        </div>
        <div className="hidden items-center justify-end gap-x-10 lg:flex">
          <div className="flex items-center gap-x-6">
            <a className="text-[16px] font-[500] cursor-pointer" onClick={()=>handleNavigate("resume-making")}>Resume Making</a>
            <a className="text-[16px] font-[500] cursor-pointer">Pricing</a>
            <a className="text-[16px] font-[500] cursor-pointer">About</a>
          </div>
          <div className="bg-custom-avatar-image flex size-[50px] items-center justify-center rounded-full cursor-pointer" onClick={()=>handleNavigate("user-profile")}/>
        </div>
        <div
          className="flex items-center justify-center text-[20px] lg:hidden"
          onClick={toggleMenu}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </div>
  );
}
