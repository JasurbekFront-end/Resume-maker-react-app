import { useState } from "react";

interface ExperienceAccordionProps {
  onDelete: () => void;
  data: ExperienceData;
  onChange: (field: keyof ExperienceData, value: string | boolean) => void;
}
interface ExperienceData {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  isCompleted: boolean;
}
export default function ExperienceAccordion({
  data,
  onDelete,
  onChange,
}: ExperienceAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleDateInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ExperienceData,
  ) => {
    let value = e.target.value;

    value = value.replace(/[^\d/]/g, "");

    if (value.length === 2 && !value.includes("/")) {
      value = value + "/";
    }
    const month = parseInt(value.slice(0, 2), 10);
    if (month > 12 || value.length > 7) return;

    onChange(field, value);
  };
  return (
    <div className="w-full rounded-md shadow-sm">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex cursor-pointer items-center justify-center bg-gray-100 px-4 py-3"
      >
        <span className="text-gray-500">
          {isOpen ? (
            <i className="fa-solid fa-angle-up"></i>
          ) : (
            <i className="fa-solid fa-angle-down"></i>
          )}
        </span>
        <span
          className="absolute right-4 text-gray-500 text-[20px]"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>

      {isOpen && (
        <div className="space-y-4 bg-white p-4 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              value={data.company || ""}
              onChange={(e) => onChange("company", e.target.value)}
              className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Role"
              value={data.role || ""}
              onChange={(e) => onChange("role", e.target.value)}
              className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Start Date (MM/YYYY)"
              value={data.startDate || ""}
              onChange={(e) => handleDateInput(e, "startDate")}
              className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="End Date (MM/YYYY)"
              value={data.endDate || ""}
              onChange={(e) => handleDateInput(e, "endDate")}
              disabled={data.isCompleted}
              className={`w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none ${data.isCompleted ? "cursor-not-allowed opacity-50" : ""}`}
            />
          </div>
          <div className="grid grid-cols-[40%_60%] gap-4">
            <div />
            <div className="flex w-full items-center">
              <div
                onClick={() => {
                  onChange("isCompleted", !data.isCompleted);
                }}
                className={`size-[15px] rounded-full ${data.isCompleted ? "border-none bg-blue-500 ring-2 ring-blue-300" : "border"} `}
              />
              <h1
                className={`pl-2 ${data.isCompleted ? "text-black" : "text-gray-700"}`}
              >
                Not completed
              </h1>
            </div>
          </div>
          <div>
            <h1 className="mt-5 font-[500] text-gray-900">Description</h1>
            <textarea
              rows={4}
              placeholder="e.g. Graduated with High Honors."
              value={data.description || ""}
              onChange={(e) => onChange("description", e.target.value)}
              className="mt-3 w-full rounded-sm border border-gray-400 p-2 text-sm outline-none focus:border-blue-500"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}
