import Link from "next/link";
import { Clock, Globe, BookOpen, Award } from "lucide-react";

interface Course {
  _id: string;
  teacherId: string;
  title: string;
  thumbnailUrl: string;
  category: string;
  level: string;
  durationHours: number;
  language: string;
  courseType: string;
  learningOutcomes: string;
  prerequisites: string;
  trailerUrl?: string;
  status: string;
  createdAt: string | Date;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course._id}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden"
    >
      {/* --- Thumbnail Section --- */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={course.thumbnailUrl || "/placeholder-image.jpg"}
          alt={course.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm capitalize">
          {course.category}
        </span>
        <span className="absolute top-3 right-3 bg-white/90 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full capitalize">
          {course.level}
        </span>
      </div>

      {/* --- Course Info --- */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-indigo-700 transition-colors">
          {course.title}
        </h3>

        {/* Course Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>{course.durationHours}h</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4 text-indigo-500" />
            <span>{course.language}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>{course.courseType}</span>
          </div>
        </div>

        {/* --- Learning Outcomes Preview --- */}
        <p className="text-gray-600 text-sm line-clamp-2 italic">
          “{course.learningOutcomes}”
        </p>

        {/* --- Bottom Info --- */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="capitalize">{course.status}</span>
          </div>
          <span className="text-xs text-gray-400">
            {new Date(course.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
