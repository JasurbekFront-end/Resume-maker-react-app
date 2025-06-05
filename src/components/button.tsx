interface ButtonProps {
  text: string;
  onClick:()=>void
}
export default function Button({text,onClick}: ButtonProps) {
  return (
    <button onClick={onClick} className="mt-4 lg:cursor-pointer flex items-center justify-center rounded-md bg-blue-600 px-8 py-2 text-[20px] font-[600] text-white">
      {text}
    </button>
  );
}
