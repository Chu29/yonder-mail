import { Bell } from "lucide-react";
import Logo from "../../../components/Logo";

const MyMessagesHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 max-w-360 mx-auto w-full">
        {/* Logo */}
        <Logo />

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition relative"
            aria-label="Notifications"
          >
            <Bell size={22} className="text-gray-700" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-300 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
            U
          </div>
        </div>
      </div>
    </header>
  );
};

export default MyMessagesHeader;
