import { ArrowRight, VideoOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useRecording } from "../../../context/RecordingContext";

const PreviewActions = () => {
  const navigate = useNavigate();
  const { resetRecording } = useRecording();

  const handleReRecord = useCallback(() => {
    resetRecording();
    navigate("/recording");
  }, [resetRecording, navigate]);

  const handleContinue = useCallback(() => {
    navigate("/schedule");
  }, [navigate]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
      {/* Re-record Button */}
      <button
        onClick={handleReRecord}
        className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition"
      >
        <VideoOff size={20} />
        <span>Re-record</span>
      </button>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="flex items-center gap-2 px-8 py-3 bg-[#6467f2] text-white font-semibold rounded-xl hover:bg-[#5456d4] transition shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <span>Continue</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default PreviewActions;
