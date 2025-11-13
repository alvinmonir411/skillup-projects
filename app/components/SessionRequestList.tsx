"use client"; // Client Component to handle state for filtering

import { GetTeachersessionreq } from "@/app/actions/GetTeachersessionreq";
import ApproveRejectBtns from "@/app/components/ApproveRejectBtns"; // Assuming this path is correct
import { CheckCircle2, XCircle, Clock, Filter } from "lucide-react";
import { useState, useMemo } from "react"; // Removed unused useEffect

// -------------------------------------------------------------------------
// --- CLIENT COMPONENT FOR FILTERING AND DISPLAY (Ideally in SessionRequestList.tsx) ---
// -------------------------------------------------------------------------
const SessionRequestList = ({
  initialRequests,
}: {
  initialRequests: any[];
}) => {
  // 1. State for filter: 'all', 'pending', 'approved', 'rejected'
  const [activeFilter, setActiveFilter] = useState("all");

  // 2. Filtered list computation using useMemo for performance
  const filteredRequests = useMemo(() => {
    if (activeFilter === "all") {
      return initialRequests;
    }
    // Filter based on the selected status
    return initialRequests.filter((req) => req.status === activeFilter);
  }, [initialRequests, activeFilter]);

  // 3. Render Status Icons/Colors helper function
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-500 border-yellow-500 bg-yellow-500/10",
          label: "Pending",
        };
      case "approved":
        return {
          icon: CheckCircle2,
          color: "text-green-600 border-green-600 bg-green-600/10",
          label: "Approved",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-600 border-red-600 bg-red-600/10",
          label: "Rejected",
        };
      default:
        return {
          icon: Filter,
          color: "text-gray-500 border-gray-500 bg-gray-500/10",
          label: status,
        };
    }
  };

  // 4. Filter Button Data
  const filterOptions = [
    { label: "All", value: "all", count: initialRequests.length },
    {
      label: "Pending",
      value: "pending",
      count: initialRequests.filter((r) => r.status === "pending").length,
    },
    {
      label: "Approved",
      value: "approved",
      count: initialRequests.filter((r) => r.status === "approved").length,
    },
    {
      label: "Rejected",
      value: "rejected",
      count: initialRequests.filter((r) => r.status === "rejected").length,
    },
  ];

  if (!initialRequests || initialRequests.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
        <h1 className="text-2xl font-semibold mb-2 text-white">
          No Session Requests Found
        </h1>
        <p className="text-gray-400">You don’t have any requests right now.</p>
      </div>
    );
  }

  // --- Render Component ---
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-extrabold text-white mb-8 border-b border-gray-700 pb-3">
        Student Session Requests
      </h1>

      {/* Filter Buttons/Tabs */}
      <div className="flex flex-wrap gap-3 mb-10 p-4 bg-gray-800 rounded-xl shadow-inner border border-gray-700">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setActiveFilter(option.value)}
            className={`
                            px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 flex items-center gap-2
                            ${
                              activeFilter === option.value
                                ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }
                        `}
          >
            {option.label}
            {/* Status Count Badge */}
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                activeFilter === option.value
                  ? "bg-indigo-700"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {option.count}
            </span>
          </button>
        ))}
      </div>

      {/* Check if the filtered list is empty */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-16 bg-gray-800 rounded-xl border border-gray-700">
          <Filter className="w-10 h-10 text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white">
            No{" "}
            {activeFilter === "all"
              ? "Requests"
              : activeFilter.charAt(0).toUpperCase() +
                activeFilter.slice(1) +
                " Requests"}{" "}
            Found
          </h2>
          <p className="text-gray-400">Try changing your filter selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRequests.map((req: any) => {
            const {
              icon: StatusIcon,
              color: statusColor,
              label: statusLabel,
            } = getStatusStyle(req.status);
            return (
              <div
                key={req._id}
                className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 
                                           transition-all duration-300 hover:shadow-indigo-500/20 p-6 flex flex-col space-y-3"
              >
                <div className="flex justify-between items-start">
                  {/* Status Badge */}
                  <span
                    className={`flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full uppercase ${statusColor}`}
                  >
                    <StatusIcon size={14} />
                    {statusLabel}
                  </span>

                  <span className="text-xs text-gray-400">
                    {/* Display the creation date */}
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-indigo-400">
                  {req.courseName || `Course ID: ${req.courseId}`}
                </h2>

                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-white">Student ID:</span>{" "}
                  {req.studentId}
                </p>

                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-white">Type:</span>{" "}
                  {req.type}
                </p>

                {/* Student Message */}
                <p className="text-gray-500 text-sm italic border-l-2 border-gray-600 pl-3 pt-2">
                  “{req.message || "No custom message provided"}”
                </p>

                {/* Action Buttons - Only for Pending Requests */}
                {req.status === "pending" && (
                  <div className="pt-4 mt-auto">
                    {/* ApproveRejectBtns is assumed to handle server actions/revalidation */}
                    <ApproveRejectBtns requestId={req._id} />
                  </div>
                )}

                {/* Status message for non-pending requests */}
                {req.status !== "pending" && (
                  <div
                    className={`pt-4 mt-auto text-center font-medium text-sm ${
                      req.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    This request has been {req.status}.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SessionRequestList;
