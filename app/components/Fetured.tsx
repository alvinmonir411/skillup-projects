import Link from "next/link";

import CourseCard from "./CourseCard";
import FavoriteButton from "./FavoriteButton";
import { getfetured } from "../actions/getfetured";

const Fetured = async () => {
  const result = await getfetured();
  const courses = result || [];

  return (
    <div className="mt-10 container mx-auto">
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course: any) => (
            <div key={course._id?.toString()} className="relative">
              <CourseCard course={course} />
              <FavoriteButton courseId={course._id?.toString()} />

              <Link
                href={`/Request/${course._id?.toString()}`}
                className="
                  mt-4
                  w-full
                  block
                  text-center
                  py-2 px-4
                  rounded-lg
                  shadow-md font-semibold
                  text-white
                  bg-blue-600
                  hover:bg-blue-700
                  transition-colors
                  duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                "
              >
                Request Session
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No Featured Courses Found 😔
          </h2>
          <p className="text-gray-500 text-sm">
            Check back later — new courses are being added regularly.
          </p>
        </div>
      )}
    </div>
  );
};

export default Fetured;
