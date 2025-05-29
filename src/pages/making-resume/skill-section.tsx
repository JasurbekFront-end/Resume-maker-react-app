import  { useState } from "react";

interface SkillsectionProps{
    onDelete:()=>void,
    onChange:(value:string)=> void,
    value:string
}
export default function SkillSection({onDelete,onChange,value}:SkillsectionProps) {
  const [isOpen, setIsOpen] = useState(true);
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
          className="absolute right-4 text-gray-500"
          onClick={(e) => {
            e.stopPropagation();
            onDelete()
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>

      {isOpen && (
        <div className="space-y-4 bg-white p-4 text-sm">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Skill"
              value={value}
              onChange={(e)=>onChange(e.target.value)}
              className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            
          </div>
        </div>
      )}
    </div>
  );
}
