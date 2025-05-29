import Service from "./service";

export default function Services() {
  return (
    <div className="mt-[30px] flex flex-col items-center justify-center">
      <h1 className="text-[35px] font-[600] text-blue-600 font-poppins">Services</h1>
      <div className="flex mt-[40px] items-center justify-center flex-col w-full gap-[20px]">
        
        <Service
          svgLink="/src/assets/understandable-ui.svg"
          text="Understandable Ui"
        />
        <Service
          svgLink="/src/assets/fast-workin.svg"
          text="Fast working"
        />
        <Service
          svgLink="/src/assets/saving-resumes.svg"
          text="Saving Resume"
        />
      </div>
    </div>
  );
}
