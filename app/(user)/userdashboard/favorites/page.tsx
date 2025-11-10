// app/userDashboard/favorites/page.tsx

import { getFavorites } from "@/app/actions/getFavorites";
import CourseCard from "@/app/components/CourseCard";
import FavoriteButton from "@/app/components/FavoriteButton";

export default async function FavoritesPage() {
  const favorites = await getFavorites();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">
        My Favorite Courses ❤️
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-lg">
          You haven’t favorited any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((course: any) => (
            <div className="relative">
              <CourseCard key={course._id?.toString()} course={course} />
              <FavoriteButton courseId={course._id?.toString()} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
