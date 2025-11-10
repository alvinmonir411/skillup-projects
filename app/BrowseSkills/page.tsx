import React from "react";
import GetAllCourses from "../actions/GetAllCourses";
import CourseCard from "../components/CourseCard";
import FavoriteButton from "../components/FavoriteButton";
import Link from "next/link";

export const dynamic = "force-dynamic"; // optional: ensures fresh data on every request

const Page = async () => {
  const courses = await GetAllCourses();

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-6 md:px-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-3">
          Browse Our Courses 🚀
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Discover expert-led courses across multiple domains. Learn at your own
          pace — or go live with real mentors.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((course: any) => (
              <div className="relative">
                <CourseCard key={course._id?.toString()} course={course} />
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
        shadow-md         font-semibold     
        text-white    
        bg-blue-600     
        hover:bg-blue-700 
        transition-colors 
        duration-300     
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 /* Accessibility focus ring */
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
              No Courses Found 😔
            </h2>
            <p className="text-gray-500 text-sm">
              Check back later — new courses are being added regularly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
