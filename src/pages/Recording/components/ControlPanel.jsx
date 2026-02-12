import { Camera, Circle, Square, Pause, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useRecording } from "../../../context/RecordingContext";

const ControlPanel = () => {
  const navigate = useNavigate();
  const {
    isRecording,
    isPaused,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    flipCamera,
  } = useRecording();

  const handleRecordToggle = useCallback(async () => {
    if (!isRecording) {
      await startRecording();
    } else if (isPaused) {
      resumeRecording();
    } else {
      pauseRecording();
    }
  }, [isRecording, isPaused, startRecording, pauseRecording, resumeRecording]);

  const handleFlip = useCallback(async () => {
    await flipCamera();
  }, [flipCamera]);

  const handleStop = useCallback(() => {
    stopRecording();
    navigate("/preview");
  }, [stopRecording, navigate]);

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 px-8 sm:px-12 py-6 flex items-center justify-center gap-6 sm:gap-12 w-full max-w-md">
        {/* Flip Button */}
        <button
          className="flex flex-col items-center gap-2 hover:opacity-75 transition group"
          onClick={handleFlip}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition">
            <Camera size={24} className="text-gray-500" />
          </div>
          <span className="text-xs text-gray-500 font-semibold">FLIP</span>
        </button>

        {/* Record/Pause Button */}
        <button
          className="flex flex-col items-center gap-2 hover:opacity-90 transition group -mt-2"
          onClick={handleRecordToggle}
        >
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition transform hover:scale-105 group-active:scale-95 ${
              isPaused
                ? "bg-green-500 hover:bg-green-600"
                : isRecording
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isPaused ? (
              <Play size={28} className="text-white ml-1" fill="white" />
            ) : isRecording ? (
              <Pause size={28} className="text-white" fill="white" />
            ) : (
              <Circle size={28} className="text-white" />
            )}
          </div>
        </button>

        {/* Stop Button */}
        <button
          className="flex flex-col items-center gap-2 hover:opacity-75 transition group disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleStop}
          disabled={!isRecording}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition">
            <Square size={24} className="text-gray-500" />
          </div>
          <span className="text-xs text-gray-500 font-semibold">STOP</span>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
