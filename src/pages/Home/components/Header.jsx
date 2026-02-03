import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Logo from "../../../components/Logo";

const Header = () => {
  // router
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#f9fafc] border-b border-solid border-[#e2e8f0] sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 max-w-360 mx-auto">
        {/* Logo */}
        <Logo />
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          <ul className="flex items-center gap-4 lg:gap-8">
            <NavLink
              to="/about"
              className="text-[#111118] text-base lg:text-lg font-medium hover:text-[#6467f2] transition-colors cursor-pointer"
            >
              About
            </NavLink>
            <NavLink
              to="/faqs"
              className="text-[#111118] text-base lg:text-lg font-medium hover:text-[#6467f2] transition-colors cursor-pointer"
            >
              FAQs
            </NavLink>
          </ul>
          <button
            className="bg-[#6467f2] h-10 lg:h-11 px-4 lg:px-6 rounded-md text-white text-base lg:text-lg font-medium cursor-pointer hover:bg-[#5456d4] transition-colors whitespace-nowrap"
            onClick={() => handleNavClick("/login")}
          >
            Login
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-[#e2e8f0] rounded-md transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-[#111118] transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-[#111118] transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-[#111118] transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-[#e2e8f0]">
          <ul className="flex flex-col gap-2 px-4 sm:px-6 py-4">
            <li
              className="text-[#111118] text-base font-medium hover:bg-[#f3f4f6] px-4 py-2 rounded-md transition-colors cursor-pointer"
              onClick={() => handleNavClick("/about")}
            >
              About
            </li>
            <li
              className="text-[#111118] text-base font-medium hover:bg-[#f3f4f6] px-4 py-2 rounded-md transition-colors cursor-pointer"
              onClick={() => handleNavClick("/faqs")}
            >
              FAQs
            </li>
            <button
              className="w-full bg-[#6467f2] h-10 px-4 rounded-md text-white text-base font-medium cursor-pointer hover:bg-[#5456d4] transition-colors mt-2"
              onClick={() => handleNavClick("/login")}
            >
              Login
            </button>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
