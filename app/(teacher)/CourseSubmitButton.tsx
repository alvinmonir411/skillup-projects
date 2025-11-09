"use client";

import { useFormStatus } from "react-dom";

export default function CourseSubmitButton({ name }: { name?: string }) {
  const { pending } = useFormStatus();

  const buttonText = pending
    ? name
      ? `Updating ${name}...`
      : "Adding Course..."
    : name
    ? name
    : "Add Course";

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
      {buttonText}
    </button>
  );
}
