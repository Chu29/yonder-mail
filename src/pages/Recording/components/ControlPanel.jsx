import { Camera, Circle, Square } from "lucide-react";
import { useNavigate } from "react-router";

// TODO: Add a confirmation dialog after stopping the recording
// const RecordingSuccessHandler = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <h1 className="">Recording Successful!</h1>
//       Do you want to save the recording?
//       <button onClick={() => navigate("/preview")}>Save</button>
//       <button onClick={() => navigate("/recording")}>Discard</button>
//     </div>
//   );
// };

const ControlPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 px-8 sm:px-12 py-6 flex items-center justify-center gap-6 sm:gap-12 w-full max-w-md">
        {/* Flip Button */}
        <button className="flex flex-col items-center gap-2 hover:opacity-75 transition group">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition">
            <Camera size={24} className="text-gray-500" />
          </div>
          <span className="text-xs text-gray-500 font-semibold">FLIP</span>
        </button>

        {/* Record Button */}
        <button className="flex flex-col items-center gap-2 hover:opacity-90 transition group -mt-2">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-red-600 transition transform hover:scale-105 group-active:scale-95">
            <Circle size={28} className="text-white" />
          </div>
        </button>

        {/* Stop Button */}
        <button
          className="flex flex-col items-center gap-2 hover:opacity-75 transition group"
          onClick={() => navigate("/preview")}
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
