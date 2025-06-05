import Service from "./service";

export default function Services() {
  return (
    <div className="mt-[30px] flex flex-col items-center justify-center lg:mt-[80px] lg:mb-[100px]">
      <h1 className="font-poppins text-[35px] font-[600] text-blue-600">
        Services
      </h1>
      <div className="mt-[40px] flex w-full flex-col items-center justify-center gap-[20px] lg:w-full lg:flex-row lg:justify-between lg:px-[140px]">
        <Service
          svgLink="/src/assets/understandable-ui.svg"
          text="Understandable Ui"
        />
        <Service svgLink="/src/assets/fast-workin.svg" text="Fast working" />
        <Service
          svgLink="/src/assets/saving-resumes.svg"
          text="Saving Resume"
        />
      </div>
    </div>
  );
}
