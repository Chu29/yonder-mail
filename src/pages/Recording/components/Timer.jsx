import React, { useState, useEffect } from "react";

const Timer = ({ maxDuration = 300, isRecording = false }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording && elapsed < maxDuration) {
      interval = setInterval(() => {
        setElapsed((prev) => (prev < maxDuration ? prev + 1 : maxDuration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, elapsed, maxDuration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const maxMins = Math.floor(maxDuration / 60);
  const maxSecs = maxDuration % 60;

  return (
    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-300 shadow-sm">
      {isRecording && (
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      )}
      <span className="font-mono font-semibold text-gray-800">
        {formatTime(elapsed)} / {maxMins.toString().padStart(2, "0")}:
        {maxSecs.toString().padStart(2, "0")}
      </span>
    </div>
  );
};

export default Timer;
