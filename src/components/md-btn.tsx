type MdBtnProps = {
  value: string;
  onClick?: () => void;
  className?: string;
};

export default function MdBtn({ value, onClick, className }: MdBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`font-poppins rounded-md px-4 py-2 text-white ${className ? className : "bg-blue-500"} font-poppins transition duration-300 active:scale-90 lg:cursor-pointer lg:px-6 lg:py-3`}
    >
      {value}
    </button>
  );
}
