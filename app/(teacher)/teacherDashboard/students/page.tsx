// app/teacher/students/page.tsx
import { getApprovedStudents } from "@/app/actions/getApprovedStudents";
import Image from "next/image";

const StudentsPage = async () => {
  // Fetch approved students
  const studentsData = await getApprovedStudents();

  // Filter only requests with valid student info
  const students = studentsData
    .map((req: any) => req.studentDetails)
    .filter((s: any) => s !== null);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Students</h1>

      {students.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map((student: any) => (
            <div
              key={student.id}
              className="bg-white/10 backdrop-blur-md rounded-xl shadow-md overflow-hidden p-4 flex flex-col items-center"
            >
              {student.picture ? (
                <div className="relative h-24 w-24 mb-4">
                  <Image
                    src={student.picture}
                    alt={student.name}
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
              ) : (
                <div className="h-24 w-24 mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-black font-semibold text-lg">
                    {student.name?.[0] || "S"}
                  </span>
                </div>
              )}

              <h2 className="text-lg font-semibold text-black">
                {student.name}
              </h2>
              <p className="text-black text-sm">{student.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No Students Found 😔
          </h2>
          <p className="text-gray-500 text-sm">
            Approved students will appear here once they join your courses.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
