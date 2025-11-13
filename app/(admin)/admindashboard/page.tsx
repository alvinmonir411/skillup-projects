import { GetMyreqSession } from "@/app/actions/GetMyreqSession";
import Image from "next/image";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import GetAllCourses from "@/app/actions/GetAllCourses";
import { GetAllreqsession } from "@/app/actions/GetAllreqsession";

const AdminDashboard = async () => {
  // Fetch all necessary data
  const courses = await GetAllCourses();
  const sessionRequests = await GetMyreqSession();
  const teacherRequests = await GetAllreqsession();
  console.log(courses, sessionRequests, teacherRequests);
  // Analytics calculations
  const totalCourses = courses?.length;
  const totalSale = courses?.reduce((sum, c) => sum + (c.sale || 0), 0);
  const totalRevenue = courses?.reduce(
    (sum, c) => sum + (c.sale || 0) * (c.price || 0),
    0
  );

  const pendingRequests = sessionRequests.filter(
    (r: any) => r.status === "pending"
  ).length;
  const approvedRequests = sessionRequests.filter(
    (r: any) => r.status === "approved"
  ).length;
  const rejectedRequests = sessionRequests.filter(
    (r: any) => r.status === "rejected"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Total Courses</h3>
          <p className="text-2xl font-bold">{totalCourses}</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-teal-400 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold">{totalSale}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">${totalRevenue}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Pending Requests</h3>
          <p className="text-2xl font-bold">{pendingRequests}</p>
        </div>
      </div>

      {/* Teacher Applications */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Teacher Applications</h2>
        {teacherRequests.length === 0 ? (
          <div className="text-center py-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <p>No teacher applications 🎉</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
            <table className="min-w-max md:min-w-full text-sm text-left">
              <thead className="bg-white/10 text-white uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">Experience</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {teacherRequests?.map((item: any) => (
                  <tr
                    key={item._id}
                    className="border-b border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <td className="px-4 py-3">{item.fullName}</td>
                    <td className="px-4 py-3 truncate max-w-[150px]">
                      {item.userEmail}
                    </td>
                    <td className="px-4 py-3 truncate max-w-[150px]">
                      {item.subject}
                    </td>
                    <td className="px-4 py-3 capitalize">{item.level}</td>
                    <td className="px-4 py-3 truncate max-w-[120px]">
                      {item?.experience?.slice(0, 40)}...
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "pending"
                            ? "bg-yellow-300/20 text-yellow-300"
                            : item.status === "approved"
                            ? "bg-green-300/20 text-green-300"
                            : "bg-red-300/20 text-red-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Session Requests */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Session Requests</h2>
        {sessionRequests.length === 0 ? (
          <div className="text-center py-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <p>No session requests yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessionRequests.map((req: any) => (
              <div
                key={req._id}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg flex flex-col"
              >
                {req.courseDetails?.thumbnailUrl && (
                  <div className="relative h-32 w-full mb-3">
                    <Image
                      src={req.courseDetails.thumbnailUrl}
                      alt={req.courseDetails.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold">
                  {req.courseDetails?.title}
                </h3>
                <p className="text-sm text-gray-300">
                  Student: {req.studentId}
                </p>
                <p className="text-sm text-gray-300 italic">
                  Message: {req.message}
                </p>
                <span
                  className={`mt-auto px-2 py-1 rounded text-xs font-medium w-max ${
                    req.status === "pending"
                      ? "bg-yellow-300/20 text-yellow-300"
                      : req.status === "approved"
                      ? "bg-green-300/20 text-green-300"
                      : "bg-red-300/20 text-red-300"
                  }`}
                >
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
