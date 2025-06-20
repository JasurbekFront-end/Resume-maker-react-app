import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MdBtn from "../../components/md-btn";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./resume-pdf";
import type {
  EducationData,
  ExperienceData,
} from "../making-resume/making-resume";
import ResumeHTMLLiveRender from "./resume-pdf-live-render";

export interface ResumeData {
  avatar: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  summary: string;
  educationSections: EducationData[];
  experienceSection: ExperienceData[];
  skillSection: string[];
}

export default function ResumePreview() {
  const saved = localStorage.getItem("resume-data");
  const initialResumeData: ResumeData = saved
    ? JSON.parse(saved)
    : {
        avatar: "",
        jobTitle: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        address: "",
        summary: "",
        educationSections: [],
        experienceSection: [],
        skillSection: [],
      };

  const resumeDataRef = useRef<ResumeData>(initialResumeData);

  useEffect(() => {
    localStorage.setItem("resume-data", JSON.stringify(resumeDataRef.current));
  }, [resumeDataRef]);
  const navigate = useNavigate();

  const handleEdit = () => navigate("/resume-making");

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-200 p-4">
      <div className="mt-8 mb-4 flex w-full max-w-[210mm] justify-between lg:w-[50%]">
        <MdBtn onClick={handleEdit} value={"Edit"} />
        <PDFDownloadLink
          document={<ResumePDF resumeData={initialResumeData} />}
          fileName={`${initialResumeData.firstName}_${initialResumeData.lastName}_CV.pdf`}
          onClick={() => {
            try {
              const existing = localStorage.getItem("user-resumes");
              let resumes = [];
              if (existing) {
                resumes = JSON.parse(existing);
              }
              resumes.push({
                ...initialResumeData,
                createdAt: new Date().toISOString(),
              });
              localStorage.setItem("user-resumes", JSON.stringify(resumes));
            } catch (error) {
              console.log("Resumeni localstoragega qo'yishda hatolik: ", error);
            }
          }}
        >
          {({ loading }) => (
            <MdBtn value={loading ? "Uploading..." : "Download"} />
          )}
        </PDFDownloadLink>
      </div>
      <div className="mb-4 flex w-full items-center justify-center text-center lg:hidden">
        <h1 className="text-[13px] text-red-500 italic">Please, download CV or turn on the desktop version on chrome to see the resume in better quality!</h1>
      </div>
      <div className="h-auto w-full lg:w-[50%]">
        <ResumeHTMLLiveRender resumeLiveData={initialResumeData} />
      </div>
    </div>
  );
}
