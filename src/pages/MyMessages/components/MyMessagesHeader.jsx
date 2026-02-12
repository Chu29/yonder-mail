import { Bell, MessageSquare, PenSquare, Home, Menu, X } from "lucide-react";
import Logo from "../../../components/Logo";
import { useNavigate } from "react-router";
import { useState } from "react";

const MyMessagesHeader = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "My Messages", path: "/messages", icon: MessageSquare },
    { label: "Record New", path: "/recording", icon: PenSquare },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2 text-gray-700 hover:text-[#6467f2] font-medium transition"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          <button
            className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition relative"
            aria-label="Notifications"
          >
            <Bell size={22} className="text-gray-700" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-300 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
            U
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#6467f2] font-medium rounded-lg transition"
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default MyMessagesHeader;
