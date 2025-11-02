// app/admin/AdminDashboard.tsx

import { redirect } from "next/navigation";
import { checkRole } from "../utils/roles";
import { SearchUsers } from "./SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
// Make sure these imports are correct based on your file structure
import { removeRole, setRole } from "../api/admin/_actions";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  // 🔒 Authorization check
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  // Fetch users based on the query
  // Note: Adjust the 'limit' as necessary for your application
  const users = query
    ? (await client.users.getUserList({ query, limit: 10 })).data
    : [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🔑 Admin Dashboard</h1>
      <p className="mb-6 text-gray-600">
        This is the protected admin dashboard restricted to users with the
        `admin` role.
      </p>

      <SearchUsers />

      <div className="mt-8 space-y-4">
        {users.map((user) => {
          // Use user.emailAddresses[0].emailAddress as a fallback if primary is complex
          const primaryEmail =
            user.emailAddresses.find(
              (email) => email.id === user.primaryEmailAddressId
            )?.emailAddress ||
            user.emailAddresses[0]?.emailAddress ||
            "N/A";

          const currentRole = (user.publicMetadata.role as string) || "user";

          return (
            <div
              key={user.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">
                  {user.firstName} {user.lastName} ({user.id})
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {primaryEmail}
                </div>
                <div
                  className={`text-sm font-medium ${
                    currentRole === "admin"
                      ? "text-red-600"
                      : currentRole === "moderator"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  Role: {currentRole}
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                {/* Make Admin */}
                {currentRole !== "admin" && (
                  <form action={setRole}>
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="admin" name="role" />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                    >
                      Make Admin
                    </button>
                  </form>
                )}

                {/* Make Moderator */}
                {currentRole !== "moderator" && (
                  <form action={setRole}>
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="moderator" name="role" />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                    >
                      Make Moderator
                    </button>
                  </form>
                )}

                {/* Make Teacher */}
                {currentRole !== "teacher" && (
                  <form action={setRole}>
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="teacher" name="role" />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition"
                    >
                      Make Teacher
                    </button>
                  </form>
                )}

                {/* Make User */}
                {currentRole !== "user" && (
                  <form action={setRole}>
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="user" name="role" />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
                    >
                      Make User
                    </button>
                  </form>
                )}

                {/* Remove Role */}
                {currentRole !== "user" && (
                  <form action={removeRole}>
                    <input type="hidden" value={user.id} name="id" />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition"
                    >
                      Remove Role
                    </button>
                  </form>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
