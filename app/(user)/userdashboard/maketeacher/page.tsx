import { applyForTeacher } from "@/app/actions/teacherActions";
import SubmitButton from "@/app/utils/ui/SubmitButton";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function MakeTeacherPage() {
  // 💡 ৩. Server-Side Auth Check
  const session = await auth();

  const formAction = applyForTeacher;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 border-b pb-2">
        Apply to Become a Teacher 🧑‍🏫
      </h1>
      <p className="text-gray-600 mb-6">
        Please provide detailed information about your teaching background and
        qualifications.
      </p>

      <form
        action={formAction}
        className="space-y-6 bg-white p-6 rounded-xl shadow-md"
      >
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            required
            className="mt-1 w-full border p-3 rounded-md focus:ring focus:outline-none"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold">
            Primary Subject Area
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="e.g., Physics, Web Development, Graphic Design"
            required
            className="mt-1 w-full border p-3 rounded-md focus:ring focus:outline-none"
          />
        </div>

        {/* Short Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-semibold">
            Short Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            placeholder="Tell us about yourself in 2-3 sentences."
            required
            className="mt-1 w-full border p-3 rounded-md focus:ring focus:outline-none"
          ></textarea>
        </div>

        {/* Teaching Experience */}
        <div>
          <label htmlFor="experience" className="block text-sm font-semibold">
            Teaching Experience (Required)
          </label>
          <textarea
            id="experience"
            name="experience"
            rows={6}
            placeholder="Share your qualifications, teaching style, and past roles."
            required
            className="mt-1 w-full border p-3 rounded-md focus:ring focus:outline-none"
          ></textarea>
        </div>

        {/* Skill Level Preference */}
        <div>
          <label className="block text-sm font-semibold">
            Preferred Teaching Level
          </label>
          <select
            name="level"
            required
            className="mt-1 w-full border p-3 rounded-md focus:ring focus:outline-none"
          >
            <option value="">Select...</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Social / Proof Links */}
        <div>
          <label htmlFor="links" className="block text-sm font-semibold">
            Proof of Expertise (Portfolio / LinkedIn / Certificates / GitHub)
          </label>
          <input
            type="url"
            id="links"
            name="links"
            placeholder="Paste link to your work or profile"
            className="mt-1 w-full border p-3 rounded-md focus:ring focus:outline-none"
          />
        </div>

        {/* Availability */}
        <div>
          <label htmlFor="availability" className="block text-sm font-semibold">
            Weekly Availability
          </label>
          <input
            type="text"
            id="availability"
            name="availability"
            placeholder="e.g. 10 hrs/week, weekends only, flexible"
            required
            className="mt-1 w-full border p-3 rounded-md focus:ring focus:outline-none"
          />
        </div>

        {/* Seriousness Check 😂 */}
        <div className="flex items-center gap-2">
          <input type="checkbox" id="promise" name="promise" required />
          <label htmlFor="promise" className="text-sm">
            I promise I’m serious and will actually teach 😌
          </label>
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
