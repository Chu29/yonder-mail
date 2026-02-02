import React, { useState } from "react";
import MyMessagesHeader from "./components/MyMessagesHeader";
import MessagesList from "./components/MessagesList";
import Footer from "../Home/components/Footer";
import { Plus, PenSquare } from "lucide-react";
import { useNavigate } from "react-router";

const MyMessagesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("scheduled");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MyMessagesHeader />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              My Messages
            </h1>
            <p className="text-gray-600">
              You have 8 messages traveling through time
            </p>
          </div>
          <button
            onClick={() => navigate("/recording")}
            className="flex items-center gap-2 bg-[#6467f2] hover:bg-[#5456d4] text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl w-full sm:w-auto justify-center sm:justify-start"
          >
            <PenSquare size={20} />
            <span>Record New Message</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("scheduled")}
            className={`pb-4 font-semibold transition ${
              activeTab === "scheduled"
                ? "text-[#6467f2] border-b-2 border-[#6467f2]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setActiveTab("delivered")}
            className={`pb-4 font-semibold transition ${
              activeTab === "delivered"
                ? "text-[#6467f2] border-b-2 border-[#6467f2]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Delivered
          </button>
        </div>

        {/* Messages List */}
        <MessagesList activeTab={activeTab} />
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/recording")}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#6467f2] hover:bg-[#5456d4] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition transform hover:scale-110"
        aria-label="Record new message"
      >
        <Plus size={28} />
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyMessagesPage;
