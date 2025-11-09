import CourseSubmitButton from "@/app/(teacher)/CourseSubmitButton";
import { GetDeteils } from "@/app/actions/GetDeteils";
import updateCourse from "@/app/actions/updateCourse";

import { notFound } from "next/navigation";

// Static dropdown data
const categories = [
  "Web Development",
  "Programming",
  "Design",
  "Marketing",
  "Business",
  "Language",
];
const levels = ["Beginner", "Intermediate", "Advanced"];
const languages = ["English", "Bangla", "Hindi"];
const classTypes = ["Live", "Recorded"];

export default async function Page({
  params,
}: {
  params: Promise<{ Editcoursesid: string }>;
}) {
  const { Editcoursesid } = await params;
  const course = await GetDeteils(Editcoursesid);
  console.log(course._id);

  if (!course) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-10 bg-white rounded-xl shadow-xl mt-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8">Edit Course</h1>

      <form action={updateCourse} className="space-y-6">
        {/* Hidden teacher info */}
        <input type="hidden" name="teacherId" value={course.teacherId} />
        <input
          type="hidden"
          name="teacherName"
          value={course.teacherName || ""}
        />
        <input type="hidden" name="courseid" value={Editcoursesid || ""} />
        {/* Hidden input for old image URL */}
        <input
          type="hidden"
          name="oldThumbnailUrl"
          value={course.thumbnailUrl}
        />
        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Course Thumbnail
          </label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
              file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 
              hover:file:bg-indigo-100 border border-gray-300 rounded-lg p-2 
              transition duration-150"
          />
          {course.thumbnailUrl && (
            <p className="text-xs text-gray-500 mt-1">
              Current:{" "}
              <a
                href={course.thumbnailUrl}
                target="_blank"
                className="text-indigo-600 underline"
              >
                View Thumbnail
              </a>
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={course.title || ""}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            defaultValue={course.category || ""}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
          >
            <option disabled value="">
              Select category
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Level
          </label>
          <select
            name="level"
            defaultValue={course.level || ""}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
          >
            <option disabled value="">
              Select level
            </option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Duration (Hours)
          </label>
          <input
            type="number"
            name="duration"
            min="1"
            defaultValue={course.durationHours || ""}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="Price"
            min="1"
            defaultValue={course?.price || ""}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
          />
        </div>
        {/* Language */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Language
          </label>
          <select
            name="language"
            defaultValue={course.language || ""}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
          >
            <option disabled value="">
              Select language
            </option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Class Type */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Course Type
          </label>
          <select
            name="classType"
            defaultValue={course.classType || ""}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
          >
            <option disabled value="">
              Select type
            </option>
            {classTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Learning Outcomes */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Learning Outcomes
          </label>
          <textarea
            name="outcomes"
            defaultValue={course.learningOutcomes || ""}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Requirements
          </label>
          <textarea
            name="requirements"
            defaultValue={course.prerequisites || ""}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Trailer */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Trailer URL
          </label>
          <input
            type="url"
            name="trailer"
            defaultValue={course.trailerUrl || ""}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Submit Button */}
        <CourseSubmitButton name={"update Course"} />
      </form>
    </div>
  );
}
