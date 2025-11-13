"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { X } from "lucide-react"; // X icon
import { requestSession } from "../actions/requestSession";

// 💡 আপনার Server Action-এর ইন্টারফেসের সাথে সামঞ্জস্যপূর্ণভাবে এটি প্রয়োজন
export interface CourseDetails {
  _id: string;
  title: string;
  teacherId: string;
}

interface RequestModalClientProps {
  courseDetails: CourseDetails;
  courseId: string;
}

const RequestModalClient: React.FC<RequestModalClientProps> = ({
  courseDetails,
  courseId,
}) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"access" | "support" | "custom">("access");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const onDismiss = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ⚠️ অতিরিক্ত মেসেজ চেক
    if (message.length < 5) {
      setSubmitStatus({
        success: false,
        message: "Message must be at least 5 characters long.",
      });
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);

    const formData = {
      courseId: courseId,
      teacherId: courseDetails.teacherId,
      type: type,
      message: message,
    };

    try {
      // 🌟 Server Action call
      const result = await requestSession(formData);

      setSubmitStatus({
        success: true,
        message: "succesfully requested",
      });

      if (result.success) {
        setTimeout(onDismiss, 2000);
      }
    } catch (error) {
      // যদি Server Action-এর মধ্যে error throw হয় (যেমন authentication fail)
      setSubmitStatus({
        success: false,
        message: "Authentication or Network Error.",
      });
    } finally {
      // 🛑 ফিক্স: অপ্রয়োজনীয় ভেরিয়েবল ঘোষণাটি সরানো হলো
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onDismiss}
    >
      <div
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-blue-600">
            Request Session for {courseDetails.title}
          </h2>
          <button
            onClick={onDismiss}
            className="text-gray-500 hover:text-red-500 transition p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Request Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) =>
                setType(e.target.value as "access" | "support" | "custom")
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            >
              <option value="access">Course Access</option>
              <option value="support">Support/Q&A</option>
              <option value="custom">Custom Request</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message (required)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Briefly explain your request (min 5 characters)..."
              disabled={isLoading}
            />
          </div>

          {/* Status Message */}
          {submitStatus && (
            <p
              className={`text-sm font-medium p-2 rounded-md ${
                submitStatus.success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {submitStatus.message}
            </p>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onDismiss}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || message.length < 5}
              className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition 
                  ${
                    isLoading
                      ? "bg-blue-400 cursor-wait"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
            >
              {isLoading ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModalClient;
