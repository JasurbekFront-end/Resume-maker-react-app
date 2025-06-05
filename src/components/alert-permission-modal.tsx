import { useEffect, useState } from "react";
import MdBtn from "./md-btn";

interface AlertPermissionProps {
  text: string;
  onClose: () => void;
  handlePermission: (status:boolean) => void;
}
export default function AlertPermissionModal({
  text,
  onClose,
  handlePermission
}: AlertPermissionProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 10);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40 transition-opacity duration-300 ${showContent ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`flex h-auto w-[80%] transform flex-col items-center justify-start gap-4 rounded-xl bg-white px-4 py-4 transition-all duration-300 ease-out md:gap-8 lg:w-[450px] lg:gap-6 lg:px-8 lg:py-8 ${
          showContent
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-10 scale-70 opacity-0"
        }`}
      >
        <h1 className="font-poppins mt-3 text-center text-[17px] text-gray-500">
          {text}
        </h1>
        <div className="flex w-full items-center justify-around">
          <MdBtn value="No" className="bg-red-500" onClick={()=>{
            onClose()
            handlePermission(false)
          }} />
          <MdBtn value="Yes" onClick={()=>{
            onClose()
            handlePermission(true)
          }} />
        </div>
      </div>
    </div>
  );
}
