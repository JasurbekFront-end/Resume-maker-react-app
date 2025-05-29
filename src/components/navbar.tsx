import { useNavigate } from "react-router-dom";

interface HiddenMenuMobileProps {
  toggleMenu: () => void;
}
export default function Navbar({ toggleMenu }: HiddenMenuMobileProps) {
  const navigate = useNavigate();
  function handleLogoClick() {
    navigate("/home");
  }
  return (
    <div className="relative z-10 border-b border-b-gray-300">
      <div className="flex h-[80px] w-full items-center justify-between px-[20px]">
        <div
          className="flex items-end justify-center gap-[15px]"
          onClick={handleLogoClick}
        >
          <img src="/src/assets/logo.png" alt="" />
          <h3 className="font-poppins -mb-[5px] font-[700] text-blue-500">
            Resume Making
          </h3>
        </div>
        <div
          className="flex items-center justify-center text-[20px]"
          onClick={toggleMenu}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </div>
  );
}
