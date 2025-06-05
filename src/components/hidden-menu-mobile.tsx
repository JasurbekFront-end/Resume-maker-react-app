import { Link, useNavigate } from "react-router-dom";

interface HiddenMenuMobileProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}
export default function HiddenMenuMobile({
  toggleMenu,
  isMenuOpen,
}: HiddenMenuMobileProps) {
  const navigate = useNavigate();
  function handleUserClick() {
    navigate("/user-profile");
  }
  return (
    <div
      className={`absolute top-0 left-0 z-20 flex h-screen w-full overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className="h-screen w-[30%] transform bg-black/40 transition-transform duration-200 ease-in-out"
        style={{ transform: `translateX(${isMenuOpen ? "0" : "-100%"})` }}
        onClick={toggleMenu}
      ></div>
      <div
        className="font-poppins h-screen w-[70%] transform bg-white transition-transform duration-400 ease-in-out"
        style={{ transform: `translateX(${isMenuOpen ? "0" : "+100%"})` }}
      >
        <div className="h-[81px] w-full border-b border-gray-300">
          <div className="flex h-full w-full items-center justify-between px-3">
            <div
              className="flex items-center gap-[15px]"
              onClick={() => {
                handleUserClick();
                toggleMenu();
              }}
            >
              <div className="bg-custom-avatar-image flex size-[50px] items-center justify-center rounded-full" />
              <h1 className="text-[18px] font-[600] text-gray-700">John Doe</h1>
            </div>
            <div className="text-[20px]" onClick={toggleMenu}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
        <div className="mt-[20px] pl-3">
          <ul className="text-[16px] text-gray-800">
            <Link to={"/resume-making"} onClick={toggleMenu}>
              <li>Resume Maker</li>
            </Link>
            <Link to={"#"}>
              <li>About</li>
            </Link>
            <Link to={"#"}>
              <li>Pricing</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
