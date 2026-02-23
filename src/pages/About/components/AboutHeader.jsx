import { useNavigate } from "react-router-dom";
import Logo from "../../../components/Logo";

const AboutHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#f9fafc] border-b border-solid border-[#e2e8f0] sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 max-w-360 mx-auto">
        <Logo />
        <button
          onClick={() => navigate("/")}
          className="text-[#6467f2] text-base lg:text-lg font-medium hover:text-[#5456d4] transition-colors cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </header>
  );
};

export default AboutHeader;
