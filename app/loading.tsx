import React from "react";

const loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
      <div className="text-center mt-4 text-gray-600">Loading...</div>
    </div>
  );
};

export default loading;
