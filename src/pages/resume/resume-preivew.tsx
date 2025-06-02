import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MdBtn from "../../components/md-btn";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ResumePDF from "./resume-pdf";
import type { EducationData, ExperienceData } from "../making-resume/making-resume";



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
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem("resume-data");
    return saved
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
  });

  const navigate = useNavigate();

  const handleEdit = () => navigate("/resume-making");
  // const handleDownload = async () => {
  //   if (!resumeRef.current) return;

  //   try {
  //     const canvas = await html2canvas(resumeRef.current, {
  //       scale: 2,
  //       useCORS: true,
  //       allowTaint: true,
  //       logging: false,
  //       backgroundColor: "#ffffff",
  //     });

  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = canvas.width * 0.264583; // px to mm
  //     const imgHeight = canvas.height * 0.264583;

  //     const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  //     const finalWidth = imgWidth * ratio;
  //     const finalHeight = imgHeight * ratio;

  //     pdf.addImage(imgData, "PNG", 0, 0, finalWidth, finalHeight);
  //     pdf.save(`${resumeData.firstName}_${resumeData.lastName}_CV.pdf`);
  //   } catch (error) {
  //     console.error("PDF yaratishda xato:", error);
  //   }
  // };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4">
      <div className="mb-8 flex w-full max-w-[210mm] justify-between">
        <MdBtn onClick={handleEdit} value={"Edit"} />
        <PDFDownloadLink
          document={<ResumePDF resumeData={resumeData} />}
          fileName={`${resumeData.firstName}_${resumeData.lastName}_CV.pdf`}
        >
          {({ loading }) => (
            <MdBtn value={loading ? "Uploading..." : "Download"} />
          )}
        </PDFDownloadLink>
      </div>

      <div className="block h-[1000px] w-full max-w-[210mm] border">
        <PDFViewer width="100%" height="100%">
          <ResumePDF resumeData={resumeData} />
        </PDFViewer>
      </div>
    </div>
  );
}
