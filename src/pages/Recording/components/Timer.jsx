import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecording } from "../../../context/RecordingContext";

const Timer = ({ maxDuration = 300 }) => {
  const navigate = useNavigate();
  const { isRecording, isPaused, duration, setDuration, stopRecording } =
    useRecording();

  useEffect(() => {
    let interval;
    if (isRecording && !isPaused && duration < maxDuration) {
      interval = setInterval(() => {
        setDuration((prev) => (prev < maxDuration ? prev + 1 : maxDuration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused, duration, maxDuration, setDuration]);

  // Auto-stop when reaching max duration
  useEffect(() => {
    if (isRecording && duration >= maxDuration) {
      stopRecording();
      navigate("/preview");
    }
  }, [duration, maxDuration, isRecording, stopRecording, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const maxMins = Math.floor(maxDuration / 60);
  const maxSecs = maxDuration % 60;

  return (
    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-300 shadow-sm">
      {isRecording && !isPaused && (
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      )}
      <span className="font-mono font-semibold text-gray-800">
        {formatTime(duration)} / {maxMins.toString().padStart(2, "0")}:
        {maxSecs.toString().padStart(2, "0")}
      </span>
    </div>
  );
};

export default Timer;
