import { GetMyCourses } from "@/app/actions/GetMyCourses";

const AnalyticsDashboard = async () => {
  const data = (await GetMyCourses()) || [];

  // Totals
  const totalCourses = data.length;
  const totalSale = data.reduce((sum, course) => sum + (course.sale || 0), 0);
  const totalRevenue = data.reduce(
    (sum, course) => sum + (course.sale || 0) * (course.price || 0),
    0
  );

  // Optional: example breakdowns (you can add more like delivered/cancelled)
  const deliveredRevenue = data
    .filter((c) => c.status === "delivered")
    .reduce((sum, c) => sum + (c.sale || 0) * (c.price || 0), 0);
  const cancelledRevenue = data
    .filter((c) => c.status === "cancelled")
    .reduce((sum, c) => sum + (c.sale || 0) * (c.price || 0), 0);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg">
        Analytics Dashboard
        <span className="block text-sm text-white/70">
          Track your performance and insights
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sales */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold">${totalRevenue}</p>
        </div>

        {/* Delivered */}
        <div className="bg-gradient-to-r from-green-400 to-teal-400 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Itme Sold</h3>
          <p className="text-2xl font-bold">${totalSale}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-300 to-cyan-300 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold">Total Courses</h3>
          <p className="text-2xl font-bold">{totalCourses}</p>
          <p className="text-sm mt-1">Courses available</p>
        </div>

        {/* {i cen add here more cards } */}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
