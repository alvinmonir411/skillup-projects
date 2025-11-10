"use client";

import { Trash2 } from "lucide-react";
import { deletCourses } from "../actions/deletCourses";

interface Props {
  courseId: string;
  onDelete?: () => void; // optional callback to refresh or update UI
}

const DeleteCourseButton: React.FC<Props> = ({ courseId, onDelete }) => {
  const handleDelete = async () => {
    const data = await deletCourses(courseId);
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-600 shadow-md transition-colors duration-200"
      aria-label="Delete course"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
};

export default DeleteCourseButton;
