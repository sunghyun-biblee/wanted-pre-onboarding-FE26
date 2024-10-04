import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center  overflow-x-hidden bg-gradient-to-r to-red-300 from-blue-500 animate-pulse shadow-lg">
      <div className="min-w-[150vw] h-[100px] bg-gradient-to-r from-red-300 via-blue-500/50  to-blue-100/10 animate-loading " />
    </div>
  );
};

export default Loading;
