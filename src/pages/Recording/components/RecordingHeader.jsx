import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

const RecordingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 max-w-360 mx-auto w-full">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition shrink-0"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              Record Message
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              Recording to your future self
            </p>
          </div>
        </div>
        <div className="shrink-0 ml-auto sm:ml-0">
          <Timer />
        </div>
      </div>
    </header>
  );
};

export default RecordingHeader;
