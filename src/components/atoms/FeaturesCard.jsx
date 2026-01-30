import { Video } from "lucide-react";
import React from "react";

const FeaturesCard = ({ icon, title, description }) => {
  return (
    <div>
      <div className="bg-[#f9fafc] rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
        <div className="bg-[#e0e7ff] p-6 rounded-full mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeaturesCard;
