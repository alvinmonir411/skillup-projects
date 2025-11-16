"use client"; // Required for using useState and other React hooks

import Link from "next/link";
import { Suspense, useState } from "react";
import { usePathname } from "next/navigation"; // To highlight the active link
import DashboardLoading from "../../utils/Loading";

// Icons (react-icons)
import {
  MdDashboard,
  MdGroup, // For Users
  MdAssignment, // For Teacher Requests
  MdLightbulb, // For Skills
  MdSchedule, // For Sessions
  MdBarChart, // For Reports
  MdSettings,
  MdMenu,
  MdClose,
} from "react-icons/md";

// Links array with Icons
const adminLinks = [
  { name: "Dashboard", path: "/admindashboard", icon: <MdDashboard /> },
  { name: "Users", path: "/admindashboard/user", icon: <MdGroup /> },
  {
    name: "Teacher Requests",
    path: "/admindashboard/teacherRequests",
    icon: <MdAssignment />,
  },
  { name: "Make Fature", path: "/admindashboard/Addfeture", icon: <MdLightbulb /> },
  { name: "Sessions", path: "/admindashboard/sessions", icon: <MdSchedule /> },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
      {/* Mobile Menu Toggle Button (Fixed Position) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-[60] md:hidden p-3 rounded-xl 
                           bg-indigo-600 text-white shadow-xl transition-all hover:bg-indigo-700"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <MdClose className="text-2xl" />
        ) : (
          <MdMenu className="text-2xl" />
        )}
      </button>

      {/* Sidebar (Responsive Visibility and Position) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 p-4 h-full 
                            bg-gray-100 dark:bg-gray-800 shadow-2xl md:shadow-none
                            transform transition-transform duration-300 ease-in-out
                            ${
                              isSidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                            }
                            md:static md:translate-x-0 md:flex-shrink-0 md:border-r border-gray-700`}
      >
        <div className="flex justify-between items-center mb-10 mt-2 md:mt-0">
          <h2 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            Admin Panel
          </h2>
          {/* Close button for sidebar on mobile */}
          <button
            onClick={toggleSidebar}
            className="p-1 md:hidden text-gray-700 dark:text-gray-300 hover:text-red-500"
            aria-label="Close menu"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {adminLinks.map((link) => {
            // Check if the current pathname matches the link path
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                // Close sidebar when a link is clicked on mobile
                onClick={() =>
                  isSidebarOpen && window.innerWidth < 768 && toggleSidebar()
                }
                className={`flex items-center gap-3 px-4 py-3 rounded-xl 
                                          font-medium transition duration-200
                                          ${
                                            isActive
                                              ? "bg-indigo-600 text-white shadow-md" // Active state styling
                                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                          }`}
              >
                {link.icon} <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay (closes sidebar when clicking outside) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 transition-all duration-300 ease-in-out md:ml-0 mt-16 md:mt-0">
        <Suspense fallback={<DashboardLoading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
