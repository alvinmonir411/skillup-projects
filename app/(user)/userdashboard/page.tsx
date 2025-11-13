import { getFavorites } from "@/app/actions/getFavorites";
import { GetMyreqSession } from "@/app/actions/GetMyreqSession";
import {
  MessageSquare,
  Heart,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";

// ------------------------------------------------
// Helper Component for a Premium Stat Card
// ------------------------------------------------
// এই কার্ডটি একটি গ্লাস/উত্থান লুক দেয় এবং হোভার ইফেক্ট যোগ করে
const StatCard = ({
  title,
  value,
  icon: Icon,
  bgColor,
  textColor,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
}) => (
  <div
    className={`p-6 rounded-2xl shadow-2xl transition duration-300 transform hover:scale-[1.02] ${bgColor} border border-opacity-20 backdrop-blur-sm`}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium opacity-80 uppercase tracking-wider text-white">
          {title}
        </p>
        <p className={`text-4xl font-extrabold mt-1 ${textColor}`}>{value}</p>
      </div>
      {/* আইকন যুক্ত করা হয়েছে */}
      <Icon className={`w-10 h-10 ${textColor} opacity-70`} />
    </div>
  </div>
);

const page = async () => {
  // ডেটা ফেচিং
  const data = await GetMyreqSession();
  const favorit = await getFavorites();

  // ডেটা ক্যালকুলেশন এবং ত্রুটি হ্যান্ডলিং (নিরাপত্তা)
  const requests = Array.isArray(data) ? data : [];
  const favorites = Array.isArray(favorit) ? favorit : [];

  const totalRequests = requests.length;
  const totalFavorites = favorites.length;

  const approvedRequests = requests.filter(
    (r: any) => r.status === "approved"
  ).length;

  const pendingRequests = totalRequests - approvedRequests;

  return (
    // মূল কন্টেইনার: ডার্ক ব্যাকগ্রাউন্ড এবং পর্যাপ্ত প্যাডিং
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* --- Header/Title Section --- */}
        <header className="p-8 bg-gray-800 rounded-2xl shadow-xl border border-blue-600/50">
          <div className="flex items-center space-x-4">
            <BarChart3 className="w-10 h-10 text-blue-500" />
            <div>
              <h1 className="text-4xl font-extrabold text-white">
                Analytics Dashboard
              </h1>
              <p className="text-lg text-gray-400 mt-1">
                Track your course requests and favorite courses.
              </p>
            </div>
          </div>
        </header>

        {/* --- Stats Grid with Icons and Premium Colors --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: My Request Sessions (Indigo) */}
          <StatCard
            title="My Request Sessions"
            value={totalRequests}
            icon={MessageSquare}
            bgColor="bg-indigo-900/70"
            textColor="text-indigo-300"
          />

          {/* Card 2: Total Favorites (Red/Pink) */}
          <StatCard
            title="Total Favorite Courses"
            value={totalFavorites}
            icon={Heart}
            bgColor="bg-red-900/70"
            textColor="text-red-300"
          />

          {/* Card 3: Approved Courses (Green) */}
          <StatCard
            title="Approved Courses"
            value={approvedRequests}
            icon={CheckCircle}
            bgColor="bg-green-900/70"
            textColor="text-green-300"
          />

          {/* Card 4: Pending Requests (Yellow/Orange) */}
          <StatCard
            title="Pending Requests"
            value={pendingRequests}
            icon={Clock}
            bgColor="bg-yellow-900/70"
            textColor="text-yellow-300"
          />
        </div>

        {/* --- Details Section Placeholder --- */}
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Looking more
          </h2>
          <p className="text-gray-400">This is Monir Dashboard For Student </p>
        </div>
      </div>
    </div>
  );
};

export default page;
