"use client";

import { useTransition } from "react";
import { setRole } from "@/app/api/admin/_actions";


interface Props {
  clerkUserId: string;
  currentStatus: string;
}

export default function TeacherActionButtons({
  clerkUserId,
  currentStatus,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", clerkUserId);
      formData.append("role", "teacher");

      const res = await setRole(formData);
   
   
    });
  };

  const handleReject = () => {
    startTransition(() => {
      // toast.error("Teacher request rejected ❌");
      // Optionally call a reject server action if you track status in DB
    });
  };

  return (
    <div className="flex justify-center gap-3">
      <button
        onClick={handleApprove}
        disabled={isPending}
        className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors disabled:opacity-50"
      >
        {isPending ? "Processing..." : "Approve"}
      </button>

      <button
        onClick={handleReject}
        disabled={isPending}
        className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
