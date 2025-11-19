// Renamed for clarity and consistency
import { getProduct } from "@/app/actions/getProduct";
import { removeRole, setRole } from "@/app/api/admin/_actions";
import Link from "next/link";

interface TeacherApplication {
  clerkUserId: string;
  fullName: string;
  userEmail: string;
  subject: string;
  level: string;
  experience: string;
  status: "pending" | "approved" | "rejected";
  _id: string;
}

type FetchedData = TeacherApplication[] | { error: string };

const AdminTeacherApplications = async () => {
  const data = await getProduct();

  // 1. Error Handling Check
  if ("error" in data) {
    console.error("Failed to load teacher applications:", data.error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-red-400 mb-6">
            Error Loading Data 🚨
          </h1>
          <div className="text-center py-12 bg-red-900/30 rounded-2xl backdrop-blur-sm shadow-lg border border-red-700">
            <p className="text-xl font-medium text-white/80">
              A database error occurred while fetching applications.
            </p>
            <p className="text-sm text-red-300 mt-2">
              **Error Detail:** {data.error}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Please check the server logs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Now, 'data' is guaranteed to be TeacherApplication[]
  const applications = data;

  // console.log(applications); // log actual fetched data (already done by the original code)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Teacher Applications
          </h1>
          <p className="text-sm text-gray-300">
            Review and approve new teacher requests
          </p>
        </div>

        {/* 2. Empty State Check */}
        {applications.length === 0 ? (
          <div className="text-center py-12 bg-white/10 rounded-2xl backdrop-blur-sm shadow-lg">
            <p className="text-xl font-medium text-white/80">
              No pending teacher applications 🎉
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Check back later for new requests.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile: card list (Mapping loop updated to use 'applications') */}
            <div className="space-y-4 sm:hidden">
              {applications.map((item) => (
                <div
                  key={item.clerkUserId} // Use clerkUserId for unique key
                  className="bg-white/5 backdrop-blur-sm border border-white/8 rounded-lg p-4 shadow-sm"
                >
                  {/* ... (mobile card content remains the same) */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold truncate">
                          {item.fullName || "—"}
                        </h2>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                            item.status === "pending"
                              ? "bg-yellow-300/20 text-yellow-300"
                              : item.status === "approved"
                              ? "bg-green-300/20 text-green-300"
                              : "bg-red-300/20 text-red-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 truncate">
                        {item.userEmail}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        <span className="font-medium text-gray-200 mr-2 capitalize">
                          {item.subject}
                        </span>
                        <span className="text-gray-400">• {item.level}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                        {item.experience
                          ? `${item.experience.slice(0, 120)}${
                              item.experience.length > 120 ? "..." : ""
                            }`
                          : "No experience provided"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.status === "approved" ? (
                      <form action={removeRole} className="flex-1">
                        <input
                          type="hidden"
                          name="id"
                          value={item.clerkUserId}
                        />
                        <input type="hidden" name="role" value="teacher" />
                        <button className="w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-xs font-semibold">
                          Revoke
                        </button>
                      </form>
                    ) : item.status === "rejected" ? (
                      <form action={setRole} className="flex-1">
                        <input
                          type="hidden"
                          name="id"
                          value={item.clerkUserId}
                        />
                        <input type="hidden" name="role" value="teacher" />
                        <button className="w-full bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-xs font-semibold">
                          Re-Approve
                        </button>
                      </form>
                    ) : (
                      <>
                        <form action={setRole} className="flex-1">
                          <input
                            type="hidden"
                            name="id"
                            value={item.clerkUserId}
                          />
                          <input type="hidden" name="role" value="teacher" />
                          <button className="w-full bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-xs font-semibold">
                            Approve
                          </button>
                        </form>
                        <form action={removeRole} className="flex-1">
                          <input
                            type="hidden"
                            name="id"
                            value={item.clerkUserId}
                          />
                          <input type="hidden" name="role" value="teacher" />
                          <button className="w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-xs font-semibold">
                            Reject
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop / Tablet: table (Mapping loop updated to use 'applications') */}
            <div className="hidden sm:block overflow-x-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-white/10 text-white uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3 w-48">Experience</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center w-56">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((item) => (
                    <tr
                      key={item.clerkUserId}
                      className="border-b border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <td className="px-4 py-3">{item.fullName || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">
                        {item.userEmail}
                      </td>
                      <td className="px-4 py-3">{item.subject}</td>
                      <td className="px-4 py-3 capitalize">{item.level}</td>
                      <td className="px-4 py-3 text-gray-400 truncate max-w-xs">
                        {item.experience
                          ? `${item.experience.slice(0, 60)}${
                              item.experience.length > 60 ? "..." : ""
                            }`
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-center">
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
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                          {item.status === "approved" ? (
                            <form action={removeRole}>
                              <input
                                type="hidden"
                                name="id"
                                value={item.clerkUserId}
                              />
                              <input
                                type="hidden"
                                name="role"
                                value="teacher"
                              />
                              <button className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors w-full sm:w-auto">
                                Revoke
                              </button>
                            </form>
                          ) : item.status === "rejected" ? (
                            <form action={setRole}>
                              <input
                                type="hidden"
                                name="id"
                                value={item.clerkUserId}
                              />
                              <input
                                type="hidden"
                                name="role"
                                value="teacher"
                              />
                              <button className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors w-full sm:w-auto">
                                Re-Approve
                              </button>
                            </form>
                          ) : (
                            <>
                              <form action={setRole}>
                                <input
                                  type="hidden"
                                  name="id"
                                  value={item.clerkUserId}
                                />
                                <input
                                  type="hidden"
                                  name="role"
                                  value="teacher"
                                />
                                <button className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors w-full sm:w-auto">
                                  Approve
                                </button>
                              </form>
                              <form action={removeRole}>
                                <input
                                  type="hidden"
                                  name="id"
                                  value={item.clerkUserId}
                                />
                                <input
                                  type="hidden"
                                  name="role"
                                  value="teacher"
                                />
                                <button className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors w-full sm:w-auto">
                                  Reject
                                </button>
                              </form>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTeacherApplications;
