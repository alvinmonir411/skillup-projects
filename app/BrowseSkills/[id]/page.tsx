// app/BrowseSkills/[id]/page.tsx

import { GetDeteils } from "@/app/actions/GetDeteils";
import {
  PlayCircle,
  Clock,
  Languages,
  Layers,
  GraduationCap,
} from "lucide-react";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const course = await GetDeteils(id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        <p>No course found for ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 md:p-12">
      {/* --- Header Section --- */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="grid md:grid-cols-2">
          {/* --- Thumbnail --- */}
          <div className="relative h-64 md:h-auto">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {course.level}
            </div>
          </div>

          {/* --- Info Section --- */}
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-extrabold mb-3">{course.title}</h1>
            <p className="text-sm text-gray-500 mb-6">
              Category: <span className="font-semibold">{course.category}</span>
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-500" />
                {course.level}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-500" />
                {course.durationHours} Hours
              </p>
              <p className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-indigo-500" />
                {course.language}
              </p>
              <p className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-500" />
                {course.courseType}
              </p>
            </div>

            <div className="mt-6">
              <a
                href={course.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
              >
                <PlayCircle className="h-5 w-5" /> Watch Trailer
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- Details Section --- */}
      <div className="max-w-6xl mx-auto mt-10 space-y-6">
        {/* What You'll Learn */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">
            What You'll Learn 🎯
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {course.learningOutcomes}
          </p>
        </div>

        {/* Requirements */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">
            Requirements 📋
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {course.prerequisites}
          </p>
        </div>

        {/* Course Info */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">
            Course Info 💼
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <p>
              <span className="font-semibold">Teacher ID:</span>{" "}
              {course.teacherId}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {course.status}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(course.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
