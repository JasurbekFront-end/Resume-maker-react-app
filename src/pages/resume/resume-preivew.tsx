export default function ResumePreview() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
        {/* Sidebar */}
        <div className="bg-gray-200 p-6 text-center md:w-1/3">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
          />
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="mb-4 text-sm text-gray-600">Frontend Developer</p>
          <div className="space-y-2 text-left text-sm">
            <p>
              <strong>Email:</strong> johndoe@example.com
            </p>
            <p>
              <strong>Phone:</strong> +1234567890
            </p>
            <p>
              <strong>City:</strong> New York
            </p>
            <p>
              <strong>Country:</strong> USA
            </p>
            <p>
              <strong>Address:</strong> 123 Main St, Apt 4
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 p-6 text-sm text-gray-800 md:w-2/3">
          {/* Summary */}
          <section>
            <h3 className="mb-2 border-b pb-1 text-lg font-semibold">
              Summary
            </h3>
            <p>
              Passionate frontend developer with 3+ years of experience building
              responsive and accessible web apps. Skilled in React, Tailwind
              CSS, and TypeScript.
            </p>
          </section>

          {/* Education */}
          <section>
            <h3 className="mb-2 border-b pb-1 text-lg font-semibold">
              Education
            </h3>
            <div>
              <p className="font-semibold">Bachelor of Computer Science</p>
              <p className="text-sm text-gray-600">Harvard University</p>
              <p className="text-xs text-gray-500 italic">
                Sep 2016 - Jun 2020
              </p>{" "}
              {/* Bu yerga start - end date qo‘shildi */}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="mb-2 border-b pb-1 text-lg font-semibold">Skills</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Git & GitHub</li>
              <li>Responsive Design</li>
            </ul>
          </section>

          {/* Experience */}
          <section>
            <h3 className="mb-2 border-b pb-1 text-lg font-semibold">
              Experience
            </h3>
            <div>
              <p className="font-semibold">Frontend Developer — TechCorp</p>
              <p className="text-sm text-gray-600">Jan 2021 - Present</p>{" "}
              {/* Bu yerda ham start - end date bor */}
              <ul className="mt-1 list-inside list-disc space-y-1">
                <li>Built interactive user interfaces with React.</li>
                <li>Collaborated with designers to improve UI/UX.</li>
                <li>Optimized performance and accessibility.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
