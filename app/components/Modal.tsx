"use client";

import { CourseData } from "@/types/course";
import { useRouter } from "next/navigation";

interface componentdata {
  courseDetails: CourseData;
  courseId: string;
}

const Modal = ({ courseDetails, courseId }: componentdata) => {
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };

  return (
    // Modal Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onDismiss}
    >
      {/* Modal Container */}
      <div
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">
          Request Session: {courseDetails.title}
        </h2>
        <p>Course ID: {courseId}</p>
        {/* ... আপনার ফর্ম বা অন্যান্য ইন্টারঅ্যাকশন লজিক ... */}
        <button onClick={onDismiss}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
