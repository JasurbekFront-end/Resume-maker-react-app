import React, { useEffect, useState } from "react";
import EducationAccordion from "./education-accordion";
import ExperienceAccordion from "./experience-accordion";
import SkillSection from "./skill-section";
import SubmitBtn from "../../components/submit-btn";
import { useNavigate } from "react-router-dom";
import ResumePDFLiveRender from "../resume/resume-pdf-live-render";
import type { ResumeData } from "../resume/resume-preivew";
import AlertModal from "../../components/alert-modal";

export interface ExperienceData {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  isCompleted: boolean;
}

export interface EducationData {
  id: number;
  school: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  isCompleted: boolean;
}

export default function MakingResume() {
  const defaultAvatar =
    "https://i.postimg.cc/66f84Qty/IMG-20250603-163909-840.jpg";

  const [resumeLiveData, setLiveResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem("resume-live-data");
    const initialData = saved
      ? JSON.parse(saved)
      : {
          avatar: null,
          jobTitle: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          city: "",
          country: "",
          address: "",
          summary: "",
          educationSections: [
            {
              id: Date.now(),
              school: "",
              field: "",
              startDate: "",
              endDate: "",
              description: "",
              isCompleted: false,
            },
          ],
          experienceSection: [
            {
              id: Date.now(),
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
              isCompleted: false,
            },
          ],
          skillSection: [""],
        };

    localStorage.removeItem("educationSections");
    localStorage.removeItem("experienceSection");
    localStorage.removeItem("skillSection");

    return initialData;
  });

  useEffect(() => {
    localStorage.setItem("resume-live-data", JSON.stringify(resumeLiveData));
  }, [resumeLiveData]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const handleChange = (field: keyof ResumeData, value: any) => {
    setLiveResumeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const navigate = useNavigate();

  function handleResumePreviewPage() {
    if (
      !resumeLiveData.firstName.trim() ||
      !resumeLiveData.lastName.trim() ||
      !resumeLiveData.jobTitle.trim() ||
      !resumeLiveData.address.trim() ||
      !resumeLiveData.city.trim() ||
      !resumeLiveData.country.trim() ||
      !resumeLiveData.phone.trim() ||
      !resumeLiveData.email.trim() ||
      resumeLiveData.skillSection.filter((s) => s.trim() !== "").length < 3 ||
      !resumeLiveData.summary.trim()
    ) {
      setAlertText(
        "Please make sure to fill in your first name, last name, job title, address, city, country, phone number, email, at least 3 skills, and summary.",
      );
      setShowAlert(true);
      return;
    }
    localStorage.setItem("resume-data", JSON.stringify(resumeLiveData));
    navigate("/resume-making/preview");
  }

  return (
    <div className="flex w-full lg:h-screen lg:overflow-hidden">
      {showAlert && (
        <AlertModal text={alertText} onClose={() => setShowAlert(false)} />
      )}
      <div className="font-poppins mt-[30px] flex w-full flex-col items-center justify-center gap-[30px] lg:mt-0 lg:w-[50%] lg:justify-start lg:overflow-y-scroll lg:pb-10 lg:shadow">
        <div className="w-[90%] rounded-md pb-4 shadow-md lg:mt-9">
          <div className="flex items-center border-b border-b-gray-300 py-2">
            <h1 className="pl-3 text-[20px] font-[600]">Personal Info</h1>
          </div>
          <div className="flex flex-col items-center justify-center px-4">
            <div className="w-full">
              <div className="mt-6 flex flex-col items-center justify-center gap-[15px]">
                <h1 className="text-[14px] text-red-500 italic">Maximum 3MB</h1>
                <label
                  htmlFor="file-upload"
                  className="block size-[60px] cursor-pointer"
                >
                  <img
                    src={
                      resumeLiveData.avatar
                        ? resumeLiveData.avatar
                        : defaultAvatar
                    }
                    alt="Upload"
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const maxSizeInMB = 3;
                      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

                      if (file.size > maxSizeInBytes) {
                        setAlertText(
                          `File size must not exceed ${maxSizeInMB}MB!`,
                        );
                        setShowAlert(true);
                        e.target.value = "";
                        return;
                      }

                      const reader = new FileReader();
                      reader.onload = () => {
                        const result = reader.result as string;
                        handleChange("avatar", result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="flex flex-col items-center justify-center gap-3">
                  <h3
                    className="cursor-pointer text-[15px] text-blue-400"
                    onClick={() =>
                      document.getElementById("file-upload")!.click()
                    }
                  >
                    Upload photo
                  </h3>
                  <h3
                    onClick={() => {
                      handleChange("avatar", null);
                    }}
                    className={`${resumeLiveData.avatar ? "" : "hidden"} cursor-pointer text-[15px] text-red-400`}
                  >
                    Remove photo
                  </h3>
                </div>
              </div>
              <div className="mt-5 flex w-full flex-col items-center justify-center gap-[15px]">
                <div className="w-full">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    required
                    type="text"
                    id="job-title"
                    value={resumeLiveData.jobTitle}
                    onChange={(e) => handleChange("jobTitle", e.target.value)}
                    className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    required
                    type="text"
                    id="first-name"
                    value={resumeLiveData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    required
                    type="text"
                    id="last-name"
                    value={resumeLiveData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email">Email</label>
                  <input
                    required
                    type="email"
                    id="email"
                    value={resumeLiveData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="phone">Phone</label>
                  <input
                    required
                    type="text"
                    id="phone"
                    value={resumeLiveData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="city">City</label>
                  <input
                    required
                    type="text"
                    id="city"
                    value={resumeLiveData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="country">Country</label>
                  <input
                    required
                    type="text"
                    id="country"
                    value={resumeLiveData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="address">Address</label>
                  <input
                    required
                    type="text"
                    id="address"
                    value={resumeLiveData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] rounded-md pb-4 shadow-md">
          <div className="flex items-center border-b border-b-gray-300 py-2">
            <h1 className="pl-3 text-[20px] font-[600]">Summary</h1>
          </div>
          <div className="mt-4 flex flex-col gap-[20px] px-4">
            <p className="text-[13px] text-gray-400">
              Include a short summary about your professional experience
            </p>
            <textarea
              className="w-full rounded border border-gray-300 p-2 text-[13px] placeholder:text-[14px] focus:border-blue-500 focus:outline-none"
              rows={6}
              placeholder="Experienced engineer with 10+ years of experience, looking for…"
              value={resumeLiveData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex w-[90%] flex-col items-center justify-center rounded-md pb-4 shadow-md">
          <div className="flex w-full items-center border-b border-b-gray-300 py-2">
            <h1 className="pl-3 text-[20px] font-[600]">Education</h1>
          </div>
          <div className="mt-[30px] flex w-full flex-col gap-[20px] px-4">
            {resumeLiveData.educationSections.map(
              (data: EducationData, index: number) => (
                <EducationAccordion
                  key={data.id}
                  data={data}
                  onDelete={() => {
                    setLiveResumeData((prev) => ({
                      ...prev,
                      educationSections: prev.educationSections.filter(
                        (item) => item.id !== data.id,
                      ),
                    }));
                  }}
                  onChange={(field, value) => {
                    setLiveResumeData((prev) => {
                      const copy = [...prev.educationSections];
                      copy[index] = { ...copy[index], [field]: value };
                      return { ...prev, educationSections: copy };
                    });
                  }}
                />
              ),
            )}
          </div>
          <div
            onClick={() => {
              setLiveResumeData((prev) => ({
                ...prev,
                educationSections: [
                  ...prev.educationSections,
                  {
                    id: Date.now(),
                    school: "",
                    field: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                    isCompleted: false,
                  },
                ],
              }));
            }}
            className="mt-4 cursor-pointer flex h-[40px] w-[90%] items-center rounded-md bg-blue-100 pl-4 text-[14px] font-[600] text-blue-600"
          >
            + Add Education
          </div>
        </div>
        <div className="flex w-[90%] flex-col items-center justify-center rounded-md pb-4 shadow-md">
          <div className="flex w-full items-center border-b border-b-gray-300 py-2">
            <h1 className="pl-3 text-[20px] font-[600]">Experience</h1>
          </div>
          <div className="mt-[30px] flex w-full flex-col gap-[20px] px-4">
            {resumeLiveData.experienceSection.map((data, index) => (
              <ExperienceAccordion
                key={data.id}
                data={data}
                onDelete={() => {
                  setLiveResumeData((prev) => ({
                    ...prev,
                    experienceSection: prev.experienceSection.filter(
                      (item) => item.id !== data.id,
                    ),
                  }));
                }}
                onChange={(field, value) => {
                  setLiveResumeData((prev) => {
                    const copy = [...prev.experienceSection];
                    copy[index] = { ...copy[index], [field]: value };
                    return { ...prev, experienceSection: copy };
                  });
                }}
              />
            ))}
          </div>
          <div
            onClick={() => {
              setLiveResumeData((prev) => ({
                ...prev,
                experienceSection: [
                  ...prev.experienceSection,
                  {
                    id: Date.now(),
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                    isCompleted: false,
                  },
                ],
              }));
            }}
            className="mt-4 flex cursor-pointer h-[40px] w-[90%] items-center rounded-md bg-blue-100 pl-4 text-[14px] font-[600] text-blue-600"
          >
            + Add Experience
          </div>
        </div>
        <div className="flex w-[90%] flex-col items-center justify-center rounded-md pb-4 shadow-md">
          <div className="flex w-full items-center border-b border-b-gray-300 py-2">
            <h1 className="pl-3 text-[20px] font-[600]">Skills</h1>
          </div>
          <div className="mt-[30px] flex w-full flex-col gap-[20px] px-4">
            {resumeLiveData.skillSection.map((skill, index: number) => (
              <SkillSection
                key={index}
                value={skill}
                onDelete={() => {
                  setLiveResumeData((prev) => ({
                    ...prev,
                    skillSection: prev.skillSection.filter(
                      (_, i) => i !== index,
                    ),
                  }));
                }}
                onChange={(skillValue: string) => {
                  setLiveResumeData((prev) => {
                    const copy = [...prev.skillSection];
                    copy[index] = skillValue;
                    return { ...prev, skillSection: copy };
                  });
                }}
              />
            ))}
          </div>
          <div
            onClick={() => {
              setLiveResumeData((prev) => ({
                ...prev,
                skillSection: [...prev.skillSection, ""],
              }));
            }}
            className="mt-4 cursor-pointer flex h-[40px] w-[90%] items-center rounded-md bg-blue-100 pl-4 text-[14px] font-[600] text-blue-600"
          >
            + Add Skill
          </div>
        </div>
        <div className="flex w-[70%] items-center justify-center">
          <SubmitBtn text="Submit" onSubmit={handleResumePreviewPage} />
        </div>
      </div>
      <div className="hidden w-[50%] overflow-y-auto bg-gray-200 p-9 lg:flex lg:flex-col">
        <ResumePDFLiveRender resumeLiveData={resumeLiveData} />
      </div>
    </div>
  );
}
