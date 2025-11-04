import Link from "next/link";
import { Suspense } from "react";
import DashboardLoading from "./../../utils/Loading";

// Icons (react-icons)
import {
  MdDashboard,
  MdSchool,
  MdPerson,
  MdSchedule,
  MdPayments,
  MdMessage,
  MdSettings,
  MdMenu,
} from "react-icons/md";

const teacherLinks = [
  { name: "Dashboard", path: "/teacherDashboard", icon: <MdDashboard /> },
  { name: "My Profile", path: "/teacherDashboard/profile", icon: <MdPerson /> },
  { name: "My Courses", path: "/teacherDashboard/courses", icon: <MdSchool /> },
  {
    name: "My Students",
    path: "/teacherDashboard/students",
    icon: <MdSchool />,
  },
  {
    name: "Sessions",
    path: "/teacherDashboard/sessions",
    icon: <MdSchedule />,
  },
  {
    name: "Earnings",
    path: "/teacherDashboard/earnings",
    icon: <MdPayments />,
  },
  { name: "Messages", path: "/teacherDashboard/messages", icon: <MdMessage /> },
  {
    name: "Settings",
    path: "/teacherDashboard/settings",
    icon: <MdSettings />,
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      {/* Mobile Menu Button */}
      <button className="md:hidden p-3 text-2xl">
        <MdMenu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 bg-gray-200 dark:bg-gray-800 w-64 p-4 h-full transition-transform 
      `}
      >
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Teacher Panel
        </h2>

        <nav className="flex flex-col gap-2">
          {teacherLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="flex items-center gap-3 px-3 py-2 rounded 
              hover:bg-gray-300 dark:hover:bg-gray-700 
              text-gray-700 dark:text-gray-300 transition"
            >
              {link.icon} <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <Suspense fallback={<DashboardLoading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
