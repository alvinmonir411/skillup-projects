import { setRole } from "@/app/api/admin/_actions";

import Link from "next/link";

const page = async () => {
  const baseURL = process.env.NEXTAUTH_URL;
  const res = await fetch(`${baseURL}/api/getproduct`, { cache: "no-store" });
  const data = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Applications</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Experience</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item: any) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{item.fullName}</td>
                <td className="px-4 py-3">{item.userEmail}</td>
                <td className="px-4 py-3">{item.subject}</td>
                <td className="px-4 py-3 capitalize">{item.level}</td>

                <td className="px-4 py-3 text-gray-600">
                  {item.experience.slice(0, 30)}...
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-md ${
                      item.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : item.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-4 py-3 flex gap-2">
                  <form action={setRole}>
                    <input type="hidden" name="id" value={item.clerkUserId} />
                    <input type="hidden" value="teacher" name="role" />
                    <button className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700">
                      Approve
                    </button>
                  </form>

                  <button className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
