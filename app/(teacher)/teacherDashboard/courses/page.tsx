import { addcourses } from "@/app/actions/addcourses";
import CourseForm from "@/app/components/CourseForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AddCoursePage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Add New Course
      </h1>
      <CourseForm
        action={addcourses}
        teacherId={user.id}
        teacherName={user.firstName ?? ""}
      />
    </div>
  );
}
