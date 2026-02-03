import React from "react";
import { useNavigate } from "react-router";
import navLogo from "../assets/nav-logo.svg";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300"
      onClick={() => navigate("/")}
    >
      <img
        src={navLogo}
        alt="yonder logo"
        className="h-12 sm:h-10 lg:h-12 w-auto"
      />
    </div>
  );
};

export default Logo;
