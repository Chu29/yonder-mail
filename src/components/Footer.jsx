import React from "react";
import { SOCIAL_LINKS } from "../utils/constants";

const Footer = () => {
  return (
    <footer className=" bg-[#ffffff]  ">
      <div className="max-w-4xl mx-4 sm:mx-6 lg:mx-auto text-center">
        <img
          src="./yonder_logo.svg"
          alt="Yonder Logo"
          className="mx-auto mb-2 sm:mb-4 w-32 sm:w-40 md:w-48"
        />

        <ul className=" mb-4 flex justify-evenly ">
          {/* Social Links */}
          {SOCIAL_LINKS.map((link) => {
            const IconComponent = link.icon;
            return (
              <li
                key={link.name}
                className="inline-block mx-2 sm:mx-4 bg-[#e0e8fe] p-2 rounded-full hover:bg-[#c3d1fd] transitions"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-800 transition"
                >
                  <IconComponent size={24} />
                </a>
              </li>
            );
          })}
        </ul>

        <p className="text-sm sm:text-base md:text-[16px] text-zinc-600 mb-2 sm:mb-4">
          &copy; {new Date().getFullYear()} Yonder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
