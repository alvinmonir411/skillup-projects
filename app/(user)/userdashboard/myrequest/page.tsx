"use client";

import { GetMyreqSession } from "@/app/actions/GetMyreqSession";
// import { DeleteRequestSession } from "@/app/actions/DeleteRequestSession";
import Image from "next/image";
import { Clock, CheckCircle2, XCircle, Trash2 } from "lucide-react";

import { useTransition, useState, useEffect } from "react";
import { DeleteRequestSession } from "@/app/actions/DeleteRequestSession";
import DashboardLoading from "@/app/utils/Loading";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [requests, setRequests] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    GetMyreqSession().then((data) => {
      setRequests(data);
      setLoaded(true);
    });
  }, []);

  async function handleDelete(requestId: string) {
    startTransition(async () => {
      const res = await DeleteRequestSession(requestId);
      if (res.success) {
        setRequests((prev) => prev.filter((r) => r._id !== requestId));
      } else {
        alert(res.message);
      }
    });
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <DashboardLoading />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4 text-center text-gray-600">
        <h1 className="text-2xl font-semibold mb-2">No Requests Found</h1>
        <p>You haven’t sent any course requests yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">
        My Course Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex flex-col relative"
          >
            {/* Course Thumbnail */}
            {req.courseDetails?.thumbnailUrl && (
              <div className="relative h-40 w-full mb-4">
                <Image
                  src={req.courseDetails.thumbnailUrl}
                  alt={req.courseDetails.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            {/* Course Info */}
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {req.courseDetails?.title || "Unknown Course"}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Teacher: {req.courseDetails?.teacherName || "N/A"}
            </p>
            <p className="text-gray-700 mb-3 text-sm italic">
              “{req.message || "No message"}”
            </p>

            {/* Status + Date */}
            <div className="mt-auto flex items-center justify-between">
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  req.status === "pending"
                    ? "text-yellow-600"
                    : req.status === "approved"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {req.status === "pending" && <Clock size={16} />}
                {req.status === "approved" && <CheckCircle2 size={16} />}
                {req.status === "rejected" && <XCircle size={16} />}
                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
              </span>

              <span className="text-xs text-gray-400">
                {new Date(req.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Cancel Button */}
            {req.status === "pending" && (
              <button
                onClick={() => handleDelete(req._id)}
                disabled={isPending}
                className="absolute top-3 right-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-full p-2 transition"
                title="Cancel Request"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
