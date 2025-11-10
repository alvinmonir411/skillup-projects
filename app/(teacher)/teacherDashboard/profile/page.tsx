import { GetMyCourses } from "@/app/actions/GetMyCourses";
import CourseCard from "@/app/components/CourseCard";
import DeleteCourseButton from "@/app/components/DeleteCourseButton";
import { Pencil, Trash2 } from "lucide-react"; // import Trash icon
import Link from "next/link";

const page = async () => {
  const courses = await GetMyCourses();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">
        My Created Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {courses?.map((data: any) => (
          <div
            key={data._id}
            className="relative group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <CourseCard course={data} />

            <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Link
                href={`/teacherDashboard/profile/${data._id}`}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-indigo-600 shadow-md transition-colors duration-200"
                aria-label={`Edit course: ${data.title || data._id}`}
              >
                <Pencil className="w-5 h-5" />
              </Link>

              {/* Client component for delete */}
              <DeleteCourseButton courseId={data._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
