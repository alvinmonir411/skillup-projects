import { addcourses } from "@/app/actions/addcourses";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CourseSubmitButton from "../../CourseSubmitButton";

// Assuming these are the full set of subjects, categories, etc.
const categories = [
  "Web Development",
  "Programming",
  "Math",
  "Business",
  "Language Learning",
  "Design",
];
const levels = ["Beginner", "Intermediate", "Advanced"];
const languages = ["English", "Bangla", "Hindi"];
const classTypes = ["Live", "Recorded"];

export default async function Page() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

  const teacherId = user.id;
  const teacherName = user.firstName;

  return (
    // 1. Premium Container: Subtle background, depth (shadow-2xl), and focus border
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl border border-gray-100">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-indigo-900">
            Create New Course 🚀
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below to launch your course globally.
          </p>
        </div>

        {/* 🚀 MAIN FORM: Server Component Form */}
        <form action={addcourses} className="space-y-6">
          <input type="hidden" name="teacherId" value={teacherId} />
          <input type="hidden" name="teacherName" value={teacherName} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* --- Course Thumbnail --- */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Course Thumbnail (Cover Image){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                required
                // Premium Input Style
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 border border-gray-300 rounded-lg p-2 transition duration-150"
              />
            </div>

            {/* --- Course Title --- */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 
    focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                placeholder="e.g., Mastering MERN Stack from Zero to Hero"
              />
            </div>
            {/* --- Category --- */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                required
                // Premium Select/Input Style
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition duration-150"
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* --- Level --- */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Level <span className="text-red-500">*</span>
              </label>
              <select
                name="level"
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition duration-150"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* --- Duration --- */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Duration (Hours) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="duration"
                min="1"
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                placeholder="e.g., 20"
              />
            </div>

            {/* --- Course Language --- */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Language <span className="text-red-500">*</span>
              </label>
              <select
                name="language"
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition duration-150"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* --- Class Type --- */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Course Type <span className="text-red-500">*</span>
              </label>
              <select
                name="classType"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition duration-150"
                required
              >
                {classTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* End of Grid */}

          {/* --- Description Fields (Full Width) --- */}
          <div className="space-y-6 pt-4 border-t border-gray-200">
            {/* Learning Outcomes */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                What Students Will Learn <span className="text-red-500">*</span>
              </label>
              <textarea
                name="outcomes"
                rows={3}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                placeholder="List key learning objectives, separated by lines..."
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Requirements / Prerequisites{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="requirements"
                rows={3}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                placeholder="What should students know beforehand? Tools needed?"
              />
            </div>

            {/* Course Trailer */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Course Trailer Video URL (Optional)
              </label>
              <input
                type="url"
                name="trailer"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                placeholder="e.g., https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          {/* --- The ONLY Client Component (Submit Button) --- */}
          <CourseSubmitButton />
        </form>
      </div>
    </div>
  );
}
