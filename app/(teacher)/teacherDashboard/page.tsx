import { GetMyCourses } from "@/app/actions/GetMyCourses";
import { GetTeachersessionreq } from "@/app/actions/GetTeachersessionreq";
import {
  DollarSign,
  BarChart3,
  BookOpen,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  TrendingDown,
  Wallet,
  ShoppingCart,
} from "lucide-react";

// ------------------------------------------------
// Helper Component for a Premium Stat Card
// ------------------------------------------------
/**
 * একটি প্রিমিয়াম স্টাইলড স্ট্যাট কার্ড।
 * এটি আইকন, মান, শিরোনাম এবং একটি সংক্ষিপ্ত বিবরণ প্রদর্শন করে।
 */
const StatCard = ({
  title,
  value,
  icon: Icon,
  gradient,
  detail,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  gradient: string; // Tailwind CSS gradient classes
  detail: string;
}) => (
  // প্রিমিয়াম ডিজাইন: সেমি-ট্রান্সপারেন্ট ডার্ক ব্যাকগ্রাউন্ড, শ্যাডো, বর্ডার এবং হোভার ইফেক্ট
  <div
    className={`p-6 rounded-2xl shadow-xl transition duration-300 transform hover:scale-[1.02] 
                    bg-gray-800/70 backdrop-blur-md border border-gray-700/50`}
  >
    <div className="flex justify-between items-center mb-3">
      {/* আইকন কন্টেইনার: প্রিমিয়াম গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড */}
      <div className={`p-3 rounded-full text-white ${gradient}`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
        {title}
      </p>
    </div>
    <p className="text-3xl font-bold text-white mb-1">
      {/* মান যদি রেভিনিউ হয়, তাহলে $ প্রতীক যোগ করা হবে */}
      {title.includes("Revenue")
        ? `$${typeof value === "number" ? value.toFixed(2) : value}`
        : value}
    </p>
    <p className="text-xs text-gray-500">{detail}</p>
  </div>
);

const page = async () => {
  // ডেটা ফেচিং এবং ত্রুটি হ্যান্ডলিং (নিরাপত্তা)
  const courses = (await GetMyCourses()) || [];
  const sessions = (await GetTeachersessionreq()) || [];

  // 🧮 Session Status Counts
  const requests = Array.isArray(sessions) ? sessions : [];
  const rejectedCount = requests.filter(
    (s: any) => s.status === "rejected"
  ).length;
  const approvedCount = requests.filter(
    (s: any) => s.status === "approved"
  ).length;
  const pendingCount = requests.filter(
    (s: any) => s.status === "pending"
  ).length;
  const totalRequests = requests.length;

  // 💰 Course Metrics
  const totalCourses = courses.length;
  // ensure c.sale is treated as number, default to 0 if null/undefined
  const totalSale = courses.reduce(
    (sum: number, c: any) => sum + (c.sale || 0),
    0
  );

  // ensure price is parsed as float, default to 0 if invalid
  const totalRevenue = courses.reduce(
    (sum: number, c: any) => sum + (c.sale || 0) * (parseFloat(c.price) || 0),
    0
  );

  const deliveredRevenue = courses
    .filter((c: any) => c.status === "delivered")
    .reduce(
      (sum: number, c: any) => sum + (c.sale || 0) * (parseFloat(c.price) || 0),
      0
    );

  const cancelledRevenue = courses
    .filter((c: any) => c.status === "cancelled")
    .reduce(
      (sum: number, c: any) => sum + (c.sale || 0) * (parseFloat(c.price) || 0),
      0
    );

  return (
    // মূল কন্টেইনার: ডার্ক ব্যাকগ্রাউন্ড, পর্যাপ্ত প্যাডিং
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* --- Header/Title Section --- */}
        <header className="p-8 bg-gray-800 rounded-2xl shadow-2xl border border-blue-500/50">
          <div className="flex items-center space-x-4">
            <BarChart3 className="w-10 h-10 text-blue-400" />
            <div>
              <h1 className="text-4xl font-extrabold text-white">
                Teacher Analytics Dashboard
              </h1>
              <p className="text-lg text-gray-400 mt-1">
                Comprehensive view of your course sales and session requests.
              </p>
            </div>
          </div>
        </header>

        {/* --- 1. Course Analytics (Revenue & Sales) --- */}
        <h2 className="text-2xl font-bold text-white pt-4 border-t border-gray-700">
          Course Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Revenue */}
          <StatCard
            title="Total Revenue"
            value={totalRevenue}
            icon={Wallet}
            gradient="bg-gradient-to-br from-violet-600 to-indigo-500"
            detail="From course sales"
          />

          {/* Items Sold */}
          <StatCard
            title="Items Sold"
            value={totalSale}
            icon={ShoppingCart}
            gradient="bg-gradient-to-br from-green-500 to-teal-400"
            detail="Across all courses"
          />

          {/* Total Courses */}
          <StatCard
            title="Total Courses"
            value={totalCourses}
            icon={BookOpen}
            gradient="bg-gradient-to-br from-blue-500 to-cyan-400"
            detail="Active on your account"
          />
        </div>

        {/* --- 2. Session Request Analytics --- */}
        <h2 className="text-2xl font-bold text-white pt-4 border-t border-gray-700">
          Session Request Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Requests */}
          <StatCard
            title="Total Requests"
            value={totalRequests}
            icon={MessageSquare}
            gradient="bg-gradient-to-br from-slate-600 to-gray-700"
            detail="All time session requests"
          />

          {/* Approved */}
          <StatCard
            title="Approved Sessions"
            value={approvedCount}
            icon={CheckCircle}
            gradient="bg-gradient-to-br from-green-500 to-emerald-600"
            detail="Approved by you"
          />

          {/* Pending */}
          <StatCard
            title="Pending Sessions"
            value={pendingCount}
            icon={Clock}
            gradient="bg-gradient-to-br from-yellow-500 to-orange-500"
            detail="Awaiting your decision"
          />

          {/* Rejected */}
          <StatCard
            title="Rejected Sessions"
            value={rejectedCount}
            icon={XCircle}
            gradient="bg-gradient-to-br from-red-500 to-pink-600"
            detail="Declined session requests"
          />
        </div>

        {/* --- 3. Revenue Breakdown --- */}
        <h2 className="text-2xl font-bold text-white pt-4 border-t border-gray-700">
          Revenue Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivered Revenue */}
          <StatCard
            title="Delivered Revenue"
            value={deliveredRevenue}
            icon={Truck}
            gradient="bg-gradient-to-br from-teal-500 to-green-500"
            detail="Revenue from delivered courses"
          />

          {/* Cancelled Revenue */}
          <StatCard
            title="Cancelled Revenue"
            value={cancelledRevenue}
            icon={TrendingDown}
            gradient="bg-gradient-to-br from-rose-500 to-red-600"
            detail="Revenue lost due to cancellations"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
