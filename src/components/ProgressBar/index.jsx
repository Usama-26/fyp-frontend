import React, { useEffect, useState } from "react";

export default function ProgressBar({ progress }) {
  const getProgressBarColor = () => {
    if (progress >= 50 && progress < 60) {
      return "bg-danger-500";
    } else if (progress >= 60 && progress < 100) {
      return "bg-warning-500";
    } else if (progress === 100) {
      return "bg-success-500";
    } else {
      return "bg-danger-500";
    }
  };

  return (
    <div className="space-y-2 mt-4">
      <div className=" flex items-center justify-between">
        <p className="text-sm font-semibold">Profile Completion</p>
        <p className="text-sm font-semibold">{`${progress}%`}</p>
      </div>
      <div className="relative w-full h-2 bg-neutral-100 rounded-md">
        <div
          className={`absolute top-0 left-0 h-full ${getProgressBarColor()} rounded-md ease-out transition-all`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
