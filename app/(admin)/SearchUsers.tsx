"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const queryTerm = formData.get("search") as string;

    // Construct URL with proper encoding for the query term
    // If query is empty, it will remove the search param
    const newUrl = queryTerm
      ? `${pathname}?search=${encodeURIComponent(queryTerm)}`
      : pathname;

    router.push(newUrl);
  };

  return (
    <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        {/* Label (visually hidden but accessible) */}
        <label htmlFor="search" className="sr-only">
          Search for users
        </label>

        {/* Input Field */}
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search users by name or email..."
          className="flex-grow w-full sm:w-auto p-3 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition duration-150 ease-in-out text-gray-800"
          // Prefill the input if a search param exists
          defaultValue={searchParams.get("search") || ""}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold 
                     rounded-lg shadow-md hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                     transition duration-150 ease-in-out"
        >
          🔍 Search
        </button>
      </form>
    </div>
  );
};
