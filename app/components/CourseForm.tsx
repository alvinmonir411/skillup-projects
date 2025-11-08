import CourseSubmitButton from "../(teacher)/CourseSubmitButton";

interface CourseFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: {
    title?: string;
    category?: string;
    level?: string;
    duration?: number;
    language?: string;
    classType?: string;
    outcomes?: string;
    requirements?: string;
    trailer?: string | "";
  };
  teacherId: string;
  teacherName: string;
}

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

export default async function CourseForm({
  action,
  initialData = {},
  teacherId,
  teacherName,
}: CourseFormProps) {
  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="teacherId" value={teacherId} />
      <input type="hidden" name="teacherName" value={teacherName} />

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Course Thumbnail
        </label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          required
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 border border-gray-300 rounded-lg p-2 transition duration-150"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Course Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={initialData.title || ""}
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
          defaultValue={initialData.category || ""}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
        >
          <option value="" disabled>
            Select a Category
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
          defaultValue={initialData.level || ""}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
        >
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
          defaultValue={initialData.duration || ""}
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
          defaultValue={initialData.language || ""}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
        >
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
          defaultValue={initialData.classType || ""}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
        >
          {classTypes.map((t) => (
            <option key={t} value={t}>
              {t}
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
          defaultValue={initialData.outcomes || ""}
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
          defaultValue={initialData.requirements || ""}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
        />
      </div>

      {/* Trailer URL */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Trailer URL
        </label>
        <input
          type="url"
          name="trailer"
          defaultValue={initialData.trailer || ""}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3"
        />
      </div>

      {/* Client Button */}
      <CourseSubmitButton />
    </form>
  );
}
