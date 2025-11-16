import { AdminSessionGet } from "@/app/actions/AdminSessionGet";
interface sessiondata {
  _id: string;
  courseTitle?: string;
  studentName?: string;
  courseId: string;
  teacherId: string;
  type: string;
  message: string;
  studentId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  teacherName?: string;
}

const page = async () => {
  const data = await AdminSessionGet();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Session Requests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((session: sessiondata) => (
          <div
            key={session._id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="font-semibold text-lg mb-1">
              {session.courseTitle}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {session.type.toUpperCase()} Request
            </p>

            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Student:</span>{" "}
              {session.studentName}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Teacher:</span>{" "}
              {session.teacherName}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Message:</span> {session.message}
            </p>

            <p className="mt-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-white text-xs ${
                  session.status === "approved"
                    ? "bg-green-500"
                    : session.status === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {session.status.toUpperCase()}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
