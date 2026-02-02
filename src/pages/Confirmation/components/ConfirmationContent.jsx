import { CheckCircle, Play, Plus, Home, Mail } from "lucide-react";
import { useNavigate } from "react-router";

const ConfirmationContent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle
            size={56}
            className="text-green-500"
            fill="currentColor"
          />
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Message Scheduled Successfully
        </h1>
        <p className="text-lg text-gray-600">
          We've locked your message away for the future.
        </p>
      </div>

      {/* Delivery Confirmed Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8">
          {/* Gradient Background Card */}
          <div className="shrink-0 w-full sm:w-40 h-32 rounded-xl bg-linear-to-br from-purple-400 via-blue-400 to-blue-500 flex items-center justify-center shadow-lg">
            <Play size={40} className="text-white fill-white" />
          </div>

          {/* Delivery Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Delivery Confirmed
            </h2>
            <p className="text-gray-700">
              Your message will be delivered on{" "}
              <span className="font-semibold">March 12, 2026 at 09:00</span>
            </p>
            <p className="text-sm text-gray-600">
              We'll keep it safe until then.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Record Another Button */}
        <button
          onClick={() => navigate("/recording")}
          className="w-full bg-[#6467f2] hover:bg-[#5456d4] text-white font-semibold py-4 rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span>Record another</span>
        </button>

        {/* My Messages Button */}
        <button
          onClick={() => navigate("/messages")}
          className="w-full bg-white border-2 border-gray-300 text-gray-900 font-semibold py-4 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
        >
          <Mail size={20} />
          <span>My Messages</span>
        </button>

        {/* Go Home Link */}
        <button
          onClick={() => navigate("/")}
          className="w-full text-gray-900 font-semibold py-4 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          <Home size={20} />
          <span>Go home</span>
        </button>
      </div>
    </div>
  );
};

export default ConfirmationContent;
