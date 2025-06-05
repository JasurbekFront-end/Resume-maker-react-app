interface ServiceData {
  svgLink: string;
  text: string;
}
export default function Service({ svgLink, text }: ServiceData) {
  return (
    <div className="font-poppins flex w-[70%] flex-col items-center justify-center rounded-xl bg-[#C9E9FF33] p-4 transition duration-300 lg:cursor-pointer lg:hover:scale-95">
      <div className="flex w-full items-center justify-center">
        <img src={svgLink} className="w-[70%]" />
      </div>
      <h1 className="text-[20px] font-[700] text-blue-700">{text}</h1>
      <p className="mt-[15px] text-center text-[16px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
        omnis.
      </p>
    </div>
  );
}
