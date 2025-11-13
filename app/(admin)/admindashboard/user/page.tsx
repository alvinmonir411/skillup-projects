import { redirect } from "next/navigation";

import { clerkClient } from "@clerk/nextjs/server";
import { checkRole } from "@/app/utils/roles";
import { SearchUsers } from "../../SearchUsers";
import { removeRole, setRole } from "@/app/api/admin/_actions";

export default async function page(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = (await params.searchParams).search;
  const client = await clerkClient();
  const users = query
    ? (await client.users.getUserList({ query, limit: 10 })).data
    : [];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        🔑 Admin Dashboard
      </h1>
      <p className="mb-6 text-sm sm:text-base text-gray-600">
        This is the protected admin dashboard restricted to users with the
        <span className="font-mono px-1 ml-1">admin</span> role.
      </p>

      <div className="mb-6">
        <SearchUsers />
      </div>

      <div className="space-y-4">
        {users.map((user) => {
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
              className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate text-sm sm:text-base">
                  {user.firstName} {user.lastName}{" "}
                  <span className="text-xs text-gray-400">({user.id})</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 truncate">
                  {primaryEmail}
                </div>
                <div
                  className={`mt-2 text-xs sm:text-sm font-medium inline-block ${
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

              <div className="flex flex-wrap items-center gap-2 md:ml-4">
                {currentRole !== "admin" && (
                  <form
                    action={setRole}
                    method="post"
                    className="w-full md:w-auto"
                  >
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="admin" name="role" />
                    <button
                      type="submit"
                      className="w-full md:w-auto px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                    >
                      Make Admin
                    </button>
                  </form>
                )}

                {currentRole !== "moderator" && (
                  <form
                    action={setRole}
                    method="post"
                    className="w-full md:w-auto"
                  >
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="moderator" name="role" />
                    <button
                      type="submit"
                      className="w-full md:w-auto px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                    >
                      Make Moderator
                    </button>
                  </form>
                )}

                {currentRole !== "teacher" && (
                  <form
                    action={setRole}
                    method="post"
                    className="w-full md:w-auto"
                  >
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="teacher" name="role" />
                    <button
                      type="submit"
                      className="w-full md:w-auto px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition"
                    >
                      Make Teacher
                    </button>
                  </form>
                )}

                {currentRole !== "user" && (
                  <form
                    action={setRole}
                    method="post"
                    className="w-full md:w-auto"
                  >
                    <input type="hidden" value={user.id} name="id" />
                    <input type="hidden" value="user" name="role" />
                    <button
                      type="submit"
                      className="w-full md:w-auto px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
                    >
                      Make User
                    </button>
                  </form>
                )}

                {currentRole !== "user" && (
                  <form
                    action={removeRole}
                    method="post"
                    className="w-full md:w-auto"
                  >
                    <input type="hidden" value={user.id} name="id" />
                    <button
                      type="submit"
                      className="w-full md:w-auto px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition"
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
