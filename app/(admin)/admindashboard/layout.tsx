import { Suspense } from "react";
import DashboardLoading from "../../utils/Loading";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const adminLinks = [
    { name: "Dashboard", path: "/admindashboard" },
    { name: "Users", path: "/admindashboard/users" },
    { name: "Teacher Requests", path: "/admindashboard/teacherRequests" },
    { name: "Skills", path: "/admindashboard/skills" },
    { name: "Sessions", path: "/admindashboard/sessions" },
    { name: "Reports", path: "/admindashboard/reports" },
    { name: "Settings", path: "/admindashboard/settings" },
  ];
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 hidden md:block">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Admin Dashboard
        </h2>
        <nav className="flex flex-col gap-3">
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Suspense fallback={<DashboardLoading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
