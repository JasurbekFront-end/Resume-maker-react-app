import React, { useEffect, useState } from "react";
import EducationAccordion from "./education-accordion";
import ExperienceAccordion from "./experience-accordion";
import SkillSection from "./skill-section";
import SubmitBtn from "../../components/submit-btn";
import { useNavigate } from "react-router-dom";
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
  const [avatar, setAvatar] = useState<string>(
    () => localStorage.getItem("avatar") || "",
  );
  const [educationSections, setEducationSections] = useState<EducationData[]>(
    () => {
      const saved = localStorage.getItem("educationSections");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: Date.now(),
              school: "",
              field: "",
              startDate: "",
              endDate: "",
              city: "",
              isCompleted: false,
            },
          ];
    },
  );
  const [experienceSection, setExperienceSection] = useState<ExperienceData[]>(
    () => {
      const saved = localStorage.getItem("experienceSection");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: Date.now(),
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ];
    },
  );
  const [skillSection, setSkillSection] = useState<string[]>(() => {
    const saved = localStorage.getItem("skillSection");
    return saved ? JSON.parse(saved) : [""];
  });
  const [jobTitle, setJobTitle] = useState(
    () => localStorage.getItem("jobTitle") || "",
  );
  const [firstName, setFirstName] = useState(
    () => localStorage.getItem("firstName") || "",
  );
  const [lastName, setLastName] = useState(
    () => localStorage.getItem("lastName") || "",
  );
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(() => localStorage.getItem("phone") || "");
  const [city, setCity] = useState(() => localStorage.getItem("city") || "");
  const [country, setCountry] = useState(
    () => localStorage.getItem("country") || "",
  );
  const [address, setAddress] = useState(
    () => localStorage.getItem("address") || "",
  );
  const [summary, setSummary] = useState(
    () => localStorage.getItem("summary") || "",
  );
  useEffect(() => {
    localStorage.setItem("jobTitle", jobTitle);
  }, [jobTitle]);
  useEffect(() => {
    localStorage.setItem("firstName", firstName);
  }, [firstName]);
  useEffect(() => {
    localStorage.setItem("lastName", lastName);
  }, [lastName]);
  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);
  useEffect(() => {
    localStorage.setItem("phone", phone);
  }, [phone]);
  useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);
  useEffect(() => {
    localStorage.setItem("country", country);
  }, [country]);
  useEffect(() => {
    localStorage.setItem("address", address);
  }, [address]);
  useEffect(() => {
    localStorage.setItem("summary", summary);
  }, [summary]);
  useEffect(() => {
    localStorage.setItem("skillSection", JSON.stringify(skillSection));
  }, [skillSection]);
  useEffect(() => {
    localStorage.setItem(
      "educationSections",
      JSON.stringify(educationSections),
    );
  }, [educationSections]);
  useEffect(() => {
    localStorage.removeItem("experienceSection");
    localStorage.setItem(
      "experienceSection",
      JSON.stringify(experienceSection),
    );
  }, [experienceSection]);
  useEffect(() => {
    localStorage.setItem("avatar", avatar);
  }, [avatar]);
  const navigate = useNavigate();
  function handleResumePreviewPage() {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !jobTitle.trim() ||
      !address.trim() ||
      !city.trim() ||
      !country.trim() ||
      !phone.trim() ||
      !email.trim() ||
      skillSection.filter((s) => s.trim() !== "").length < 3 ||
      !summary.trim()
    ) {
      alert(
        "Please make sure to fill in your first name, last name, job title, address, city, country, phone number, email, at least 3 skills, and summary.",
      );
      return;
    }
    navigate("/resume-making/preview");
    localStorage.setItem(
      "resume-data",
      JSON.stringify({
        avatar,
        firstName,
        lastName,
        jobTitle,
        address,
        city,
        country,
        phone,
        email,
        summary,
        skillSection,
        educationSections,
        experienceSection,
      }),
    );
  }
  return (
    <div className="font-poppins mt-[30px] flex flex-col items-center justify-center gap-[30px]">
      <div className="w-[90%] rounded-md pb-4 shadow-md">
        <div className="flex items-center border-b border-b-gray-300 py-2">
          <h1 className="pl-3 text-[20px] font-[600]">Personal info</h1>
        </div>
        <div className="flex flex-col items-center justify-center px-4">
          <div className="w-full">
            <div className="mt-6 flex items-center gap-[15px]">
              <label
                htmlFor="file-upload"
                className="block size-[60px] cursor-pointer"
              >
                <img
                  src={avatar}
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
                    const reader = new FileReader();
                    reader.onload = () => setAvatar(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div className="flex flex-col gap-3">
                <h3
                  className="cursor-pointer text-[15px] text-blue-400"
                  onClick={() =>
                    document.getElementById("file-upload")!.click()
                  }
                >
                  Upload photo
                </h3>
                <h3
                  onClick={() => setAvatar("/src/assets/upload-picture.png")}
                  className={`${avatar === "/src/assets/upload-picture.png" ? "hidden" : ""} cursor-pointer text-[15px] text-red-400`}
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
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label htmlFor="first-name">First Name</label>
                <input
                  required
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label htmlFor="last-name">Last Name</label>
                <input
                  required
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label htmlFor="phone">Phone</label>
                <input
                  required
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label htmlFor="city">City</label>
                <input
                  required
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label htmlFor="country">Country</label>
                <input
                  required
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="font-poppins mt-1 h-[35px] w-full rounded-md border border-gray-400 indent-2 text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label htmlFor="address">Address</label>
                <input
                  required
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex w-[90%] flex-col items-center justify-center rounded-md pb-4 shadow-md">
        <div className="flex w-full items-center border-b border-b-gray-300 py-2">
          <h1 className="pl-3 text-[20px] font-[600]">Education</h1>
        </div>
        <div className="mt-[30px] flex w-full flex-col gap-[20px] px-4">
          {educationSections.map((data: EducationData, index: number) => (
            <EducationAccordion
              key={data.id}
              data={data}
              onDelete={() => {
                setEducationSections((prev) =>
                  prev.filter((item) => item.id !== data.id),
                );
              }}
              onChange={(field, value) => {
                setEducationSections((prev) => {
                  const copy = [...prev];
                  copy[index] = { ...copy[index], [field]: value };
                  return copy;
                });
              }}
            />
          ))}
        </div>
        <div
          onClick={() => {
            setEducationSections((prev) => [
              ...prev,
              {
                id: Date.now(),
                school: "",
                field: "",
                startDate: "",
                endDate: "",
                description: "",
                isCompleted: false,
              },
            ]);
          }}
          className="mt-4 flex h-[40px] w-[90%] items-center rounded-md bg-blue-100 pl-4 text-[14px] font-[600] text-blue-600"
        >
          + Add education
        </div>
      </div>
      <div className="flex w-[90%] flex-col items-center justify-center rounded-md pb-4 shadow-md">
        <div className="flex w-full items-center border-b border-b-gray-300 py-2">
          <h1 className="pl-3 text-[20px] font-[600]">Experience</h1>
        </div>
        <div className="mt-[30px] flex w-full flex-col gap-[20px] px-4">
          {experienceSection.map((data, index) => (
            <ExperienceAccordion
              key={data.id}
              data={data}
              onDelete={() => {
                setExperienceSection((prev) =>
                  prev.filter((item) => item.id !== data.id),
                );
              }}
              onChange={(field, value) => {
                setExperienceSection((prev) => {
                  const copy = [...prev];
                  copy[index] = { ...copy[index], [field]: value };
                  return copy;
                });
              }}
            />
          ))}
        </div>

        <div
          onClick={() => {
            setExperienceSection((prev) => [
              ...prev,
              {
                id: Date.now(),
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                description: "",
                isCompleted: false,
              },
            ]);
          }}
          className="mt-4 flex h-[40px] w-[90%] items-center rounded-md bg-blue-100 pl-4 text-[14px] font-[600] text-blue-600"
        >
          + Add experience
        </div>
      </div>
      <div className="flex w-[90%] flex-col items-center justify-center rounded-md pb-4 shadow-md">
        <div className="flex w-full items-center border-b border-b-gray-300 py-2">
          <h1 className="pl-3 text-[20px] font-[600]">Skills</h1>
        </div>
        <div className="mt-[30px] flex w-full flex-col gap-[20px] px-4">
          {skillSection.map((_, index: number) => (
            <SkillSection
              key={index}
              value={skillSection[index]}
              onDelete={() => {
                setSkillSection((prev) => prev.filter((_, i) => i !== index));
              }}
              onChange={(skillValue: string) => {
                setSkillSection((prev) => {
                  const copy = [...prev];
                  copy[index] = skillValue;
                  return copy;
                });
              }}
            />
          ))}
        </div>
        <div
          onClick={() => {
            setSkillSection((prev) => [...prev, ""]);
          }}
          className="mt-4 flex h-[40px] w-[90%] items-center rounded-md bg-blue-100 pl-4 text-[14px] font-[600] text-blue-600"
        >
          + Add Skill
        </div>
      </div>
      <div className="flex w-[70%] items-center justify-center">
        <SubmitBtn text="Submit" onSubmit={handleResumePreviewPage} />
      </div>
    </div>
  );
}
