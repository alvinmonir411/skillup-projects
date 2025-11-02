import React from "react";

const Banner = () => {
  return (
    <div className="relative bg-[url('/Bannr.jpg')] bg-cover bg-center h-[60vh] w-full flex items-center justify-center">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 md:px-12">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-snug">
          Discover Skills, <br /> Exchange Knowledge
        </h1>
        <p className="text-md md:text-lg max-w-2xl mx-auto">
          Connect with expert teachers and learn new skills through personalized
          one-on-one sessions
        </p>
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Banner;
