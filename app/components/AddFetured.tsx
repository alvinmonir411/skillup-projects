"use client";
import { useState } from "react";
import { makefetured } from "@/app/actions/makefetured";

interface Props {
  courseId: string;
  isFeatured: boolean;
}

const AddFetured = ({ courseId, isFeatured }: Props) => {
  const [featured, setFeatured] = useState(isFeatured);
  const [loading, setLoading] = useState(false);

  const handleFeatureToggle = async () => {
    setLoading(true);
    try {
      const res = await makefetured(courseId);
      if (res.success) {
        setFeatured(res.isfetured);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFeatureToggle}
      disabled={loading}
      className={`w-full mt-3 px-4 py-2 rounded-lg font-semibold text-white transition ${
        featured
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {loading
        ? "Processing..."
        : featured
        ? "Remove Featured"
        : "Make Featured"}
    </button>
  );
};

export default AddFetured;
