import { memo, useCallback } from "react";
import { useNavigate } from "react-router";
import navLogo from "../assets/nav-logo.svg";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div
      className="shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300"
      onClick={handleClick}
    >
      <img
        src={navLogo}
        alt="yonder logo"
        className="h-12 sm:h-10 lg:h-12 w-auto"
      />
    </div>
  );
};

export default memo(Logo);
