import { GetMyCourses } from "@/app/actions/GetMyCourses";
import CourseCard from "@/app/components/CourseCard";
import EditCourseModal from "@/app/components/EditCourseModal";
import { Pencil } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const courses = await GetMyCourses();

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {courses?.map((data: any) => (
        <div key={data._id} className="relative group">
          <CourseCard course={data} />

          <Link href={`/teacherDashboard/profile/${data._id}`}>
            <Pencil />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default page;
