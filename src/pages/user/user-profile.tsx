import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { ResumeData } from "../resume/resume-preivew";
import ResumePDF from "../resume/resume-pdf";
import MdBtn from "../../components/md-btn";
import AlertPermissionModal from "../../components/alert-permission-modal";

export default function UserProfile() {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [deletePendingIndex, setDeletePendingIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const saved = localStorage.getItem("user-resumes");
    if (saved) {
      setResumes(JSON.parse(saved));
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {showModal && (
        <AlertPermissionModal
          text="Do you really want to delete it?"
          onClose={() => {
            setShowModal(false);
            setDeletePendingIndex(null);
          }}
          handlePermission={(status) => {
            if (status && deletePendingIndex !== null) {
              const updated = [...resumes];
              updated.splice(deletePendingIndex, 1);
              setResumes(updated);
              localStorage.setItem("user-resumes", JSON.stringify(updated));
            }
            setShowModal(false);
            setDeletePendingIndex(null);
          }}
        />
      )}
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Downloaded Resumes
      </h1>

      {resumes.length === 0 ? (
        <p className="text-center text-gray-500">No resumes downloaded yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {resumes.map((resume, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg"
            >
              <div className="mb-3 text-lg font-semibold text-gray-700">
                {resume.firstName} {resume.lastName} —{" "}
                <span className="text-indigo-600">{resume.jobTitle}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <PDFDownloadLink
                  document={<ResumePDF resumeData={resume} />}
                  fileName={`${resume.firstName}_${resume.lastName}_CV.pdf`}
                >
                  {({ loading }) => (
                    <MdBtn
                      value={loading ? "Preparing..." : "Download"}
                      className="bg-indigo-500 hover:bg-indigo-600"
                    />
                  )}
                </PDFDownloadLink>

                <MdBtn
                  value="Delete"
                  onClick={() => {
                    setDeletePendingIndex(index);
                    setShowModal(true);
                  }}
                  className="bg-red-500 hover:bg-red-600"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
