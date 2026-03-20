import React from "react";
import { SOCIAL_LINKS } from "../utils/constants";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <img
              src="./yonder_logo.svg"
              alt="Yonder Logo"
              className="h-10 w-auto"
            />
            <p className="text-sm text-gray-600 text-center md:text-left">
              Sending memories to the future
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center">
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <h3 className="font-semibold text-gray-900 text-sm">Product</h3>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#6467f2] transition"
              >
                How it works
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#6467f2] transition"
              >
                Features
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#6467f2] transition"
              >
                Pricing
              </a>
            </div>

            <div className="flex flex-col gap-2 items-center sm:items-start">
              <h3 className="font-semibold text-gray-900 text-sm">Company</h3>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#6467f2] transition"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#6467f2] transition"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#6467f2] transition"
              >
                Help Center
              </a>
            </div>

            <div className="flex flex-col gap-2 items-center sm:items-start">
              <h3 className="font-semibold text-gray-900 text-sm">Legal</h3>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#6467f2] transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#6467f2] transition"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#6467f2] transition"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <h3 className="font-semibold text-gray-900 text-sm">Follow Me</h3>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-2.5 rounded-full hover:bg-[#6467f2] hover:text-white text-gray-600 transition"
                    aria-label={link.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Yonder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
