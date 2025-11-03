"use client";

import { useFormStatus } from "react-dom";

import React from "react";
import DashboardLoading from "../Loading";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 transition duration-150"
    >
      {pending ? (
        <>
          <DashboardLoading />
          <span className="ml-2">Submitting Application...</span>
        </>
      ) : (
        "Submit Application for Review"
      )}
    </button>
  );
}
