import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import Logo from "../../../components/Logo";

const ScheduleHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Logo />

        {/* Right Side - Logout and Profile */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="p-2 hover:bg-gray-100 rounded-md transition"
            aria-label="Logout"
          >
            <LogOut size={22} className="text-gray-700" />
          </button>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-300 flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
        </div>
      </div>
    </header>
  );
};

export default ScheduleHeader;
