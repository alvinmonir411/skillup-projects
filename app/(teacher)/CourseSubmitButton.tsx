"use client";

import { useFormStatus } from "react-dom";

export default function CourseSubmitButton() {
  // useFormStatus Hook shudhu Client Component-e use kora jay
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-3 mt-6 text-white font-semibold rounded-lg transition duration-150 ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {pending ? "Adding Course..." : "Add Course"}
    </button>
  );
}
