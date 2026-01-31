import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/hero-image.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#f9fafc] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-b-zinc-200 ">
      <div className="max-w-4xl mx-auto">
        {/* Text Content */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#111118] mb-4 sm:mb-6">
            A message to your future self
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#64748b] mb-8 sm:mb-10 leading-relaxed">
            Record today. Receive tomorrow. Capture moments today that you'll
            cherish years from now.
          </p>
          <button
            onClick={() => navigate("/record")}
            className="bg-[#6467f2] hover:bg-[#5456d4] transition-colors text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-md text-base sm:text-lg cursor-pointer"
          >
            Record your message
          </button>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg relative">
          <img
            src={heroImage}
            alt="Recording devices setup"
            className="w-full h-full lg:h-137.5 object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
