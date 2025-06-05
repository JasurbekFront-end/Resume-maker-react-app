import { useEffect, useState } from "react";
import type { ResumeData } from "./resume-preivew";

export default function ResumeHTMLLiveRender({
  resumeLiveData,
}: {
  resumeLiveData: ResumeData;
}) {
  const [isAcceptableEducation, setIsAcceptableEducation] = useState(false);

  useEffect(() => {
    const status = resumeLiveData.educationSections.some(
      (item) =>
        item.school ||
        item.field ||
        item.startDate ||
        item.endDate ||
        item.description ||
        item.isCompleted,
    );
    setIsAcceptableEducation(status);
  }, [resumeLiveData.educationSections]);
  const [isAcceptableExperience, setIsAcceptableExperience] = useState(false);

  useEffect(() => {
    const status = resumeLiveData.experienceSection.some(
      (item) =>
        item.company ||
        item.role ||
        item.startDate ||
        item.endDate ||
        item.description ||
        item.isCompleted,
    );
    setIsAcceptableExperience(status);
  }, [resumeLiveData.experienceSection]);
  const [isAcceptableSkills, setIsAcceptableSkills] = useState(false);
  useEffect(() => {
    const status = resumeLiveData.skillSection.some((item) => item !== "");
    setIsAcceptableSkills(status);
  }, [resumeLiveData.skillSection]);
  return (
    <div className="mx-auto h-auto w-full max-w-4xl bg-white p-4 font-sans text-sm text-[#1a1a1a] sm:p-6 md:p-8">
      <div className="mb-8 text-center">
        {resumeLiveData.avatar && (
          <img
            src={resumeLiveData.avatar}
            alt="avatar"
            className="mx-auto mb-3 h-20 w-20 rounded-full object-cover"
          />
        )}
        <h1 className="text-2xl font-bold text-[#111111] sm:text-3xl">
          {resumeLiveData.firstName} {resumeLiveData.lastName}
        </h1>
        <p className="mt-1 text-sm text-[#555555]">{resumeLiveData.jobTitle}</p>
      </div>

      <div className="mb-8 text-center text-xs leading-relaxed text-[#444444] sm:text-sm">
        {resumeLiveData.email && <p>{resumeLiveData.email}</p>}
        {resumeLiveData.phone && <p>{resumeLiveData.phone}</p>}
        {(resumeLiveData.city || resumeLiveData.country) && (
          <p>
            {resumeLiveData.city}, {resumeLiveData.country}
          </p>
        )}
        {resumeLiveData.address && <p>{resumeLiveData.address}</p>}
      </div>

      {resumeLiveData.summary && (
        <div className="mb-6 border-b border-gray-300 pb-2 break-words">
          <h2 className="mb-2 text-sm font-bold tracking-wide text-[#333333] uppercase">
            Summary
          </h2>
          <p className="text-[#333333]">{resumeLiveData.summary}</p>
        </div>
      )}

      {resumeLiveData.educationSections?.length > 0 &&
        isAcceptableEducation && (
          <div className="mb-6 border-b border-gray-300 pb-2">
            <h2 className="mb-2 text-sm font-bold tracking-wide text-[#333333] uppercase">
              Education
            </h2>
            {resumeLiveData.educationSections.map((edu) => (
              <div key={edu.id} className="mb-4">
                <p className="font-bold text-[#222222]">{edu.field}</p>
                <p className="text-[#666666]">{edu.school}</p>
                <p className="text-xs text-[#888888] italic">
                  {edu.startDate} - {edu.isCompleted ? "Ongoing" : edu.endDate}
                </p>
                <p className="mt-2 leading-relaxed break-words text-[#333333]">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        )}

      {resumeLiveData.experienceSection?.length > 0 &&
        isAcceptableExperience && (
          <div className="mb-6 border-b border-gray-300 pb-2">
            <h2 className="mb-2 text-sm font-bold tracking-wide text-[#333333] uppercase">
              Experience
            </h2>
            {resumeLiveData.experienceSection.map((exp) => (
              <div key={exp.id} className="mb-4">
                <p className="font-bold text-[#222222]">{exp.role}</p>
                <p className="text-[#666666]">{exp.company}</p>
                <p className="text-xs text-[#888888] italic">
                  {exp.startDate} - {exp.isCompleted ? "Ongoing" : exp.endDate}
                </p>
                <p className="mt-2 leading-relaxed break-words text-[#333333]">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}

      {resumeLiveData.skillSection?.length > 0 && isAcceptableSkills && (
        <div className="mb-6 border-b border-gray-300 pb-2">
          <h2 className="mb-2 text-sm font-bold tracking-wide text-[#333333] uppercase">
            Skills
          </h2>
          <div className="flex flex-wrap">
            {resumeLiveData.skillSection.map((skill, idx) => (
              <span
                key={idx}
                className="m-1 rounded bg-gray-100 px-3 py-1 text-xs text-[#222222]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
