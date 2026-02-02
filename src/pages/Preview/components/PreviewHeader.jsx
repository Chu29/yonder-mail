import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import yonderLogo from "../../../assets/nav-logo.svg";

const PreviewHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 max-w-360 mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={yonderLogo}
            alt="Yonder"
            className="h-12 sm:h-10 lg:h-12 w-auto"
          />
        </div>

        {/* Right Side - Back and Profile */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-md transition"
            aria-label="Go back"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-300 flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
        </div>
      </div>
    </header>
  );
};

export default PreviewHeader;
