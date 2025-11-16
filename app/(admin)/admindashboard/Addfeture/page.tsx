import GetAllCourses from "@/app/actions/GetAllCourses";
import AddFetured from "@/app/components/AddFetured";
import Image from "next/image";

const Page = async () => {
  const datas = await GetAllCourses();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {datas.map((course) => (
        <div
          key={course._id.toString()}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex flex-col"
        >
          <div className="relative h-52 w-full">
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-5 flex flex-col gap-2 flex-1">
            <h3 className="text-xl font-bold tracking-wide text-black">
              {course.title}
            </h3>

            <div className="text-sm text-black space-y-1">
              <p>Teacher: {course.teacherName}</p>
              <p>Category: {course.category}</p>
              <p>Level: {course.level}</p>
              <p>Duration: {course.durationHours} hrs</p>
              <p>Price: ${course.price}</p>
              <p>
                Type: {course.courseType} | Language: {course.language}
              </p>
            </div>

            <p className="text-black text-sm italic mt-2 line-clamp-2">
              {course.learningOutcomes}
            </p>

            <div className="mt-auto pt-3">
              <AddFetured
                courseId={course._id.toString()}
                isFeatured={course.isfetured}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
