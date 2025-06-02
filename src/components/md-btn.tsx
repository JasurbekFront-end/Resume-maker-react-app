type MdBtnProps = {
  value: string;
  onClick ?:()=>void
};

export default function MdBtn({value,onClick}:MdBtnProps) {
  return (
    <button onClick={onClick} className="font-poppins rounded-md bg-blue-500 px-4 py-2 text-white">
      {value}
    </button>
  );
}
