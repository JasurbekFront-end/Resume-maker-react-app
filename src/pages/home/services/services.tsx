import Service from "./service";
import understandableUi from "../../../assets/understandable-ui.svg";
import fastWorking from "../../../assets/fast-workin.svg";
import savingResumes from "../../../assets/saving-resumes.svg";
export default function Services() {
  return (
    <div className="mt-[30px] flex flex-col items-center justify-center lg:mt-[80px] lg:mb-[100px]">
      <h1 className="font-poppins text-[35px] font-[600] text-blue-600">
        Services
      </h1>
      <div className="mt-[40px] flex w-full flex-col items-center justify-center gap-[20px] lg:w-full lg:flex-row lg:justify-between lg:px-[140px]">
        <Service svgLink={understandableUi} text="Understandable Ui" />
        <Service svgLink={fastWorking} text="Fast working" />
        <Service svgLink={savingResumes} text="Saving Resume" />
      </div>
    </div>
  );
}
