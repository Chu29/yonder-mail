import { useState, useMemo } from "react";
import AppHeader from "../../components/AppHeader";
import MessagesList from "./components/MessagesList";
import Footer from "../Home/components/Footer";
import { Plus, PenSquare } from "lucide-react";
import { useNavigate } from "react-router";
import { useMessages } from "../../context/MessageContext";

const MyMessagesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("scheduled");
  const { messages } = useMessages();

  // Calculate statistics
  const stats = useMemo(() => {
    // Safely handle empty or undefined messages
    if (!messages || !Array.isArray(messages)) {
      return { scheduled: 0, delivered: 0, total: 0, upcoming: null };
    }

    const scheduled = messages.filter((msg) => msg.status === "scheduled");
    const delivered = messages.filter(
      (msg) => msg.status === "sent" || msg.status === "delivered",
    );
    const total = messages.length;

    // Find next delivery
    const upcoming = scheduled
      .filter((msg) => msg.deliveryDate)
      .sort((a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate))[0];

    return {
      scheduled: scheduled.length,
      delivered: delivered.length,
      total,
      upcoming,
    };
  }, [messages]);

  // Generate dynamic subtitle
  const subtitle = useMemo(() => {
    if (stats.total === 0) {
      return "Start your journey by recording your first message";
    }
    if (stats.total === 1) {
      return "You have 1 message traveling through time";
    }
    if (stats.upcoming) {
      const daysUntil = Math.ceil(
        (new Date(stats.upcoming.deliveryDate) - new Date()) /
          (1000 * 60 * 60 * 24),
      );
      if (daysUntil > 0) {
        return `You have ${stats.total} messages • Next delivery in ${daysUntil} day${daysUntil > 1 ? "s" : ""}`;
      }
    }
    return `You have ${stats.total} messages traveling through time`;
  }, [stats]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              My Messages
            </h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <button
            onClick={() => navigate("/recording")}
            className="flex items-center gap-2 bg-[#6467f2] hover:bg-[#5456d4] text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl w-full sm:w-auto justify-center sm:justify-start"
          >
            <PenSquare size={20} />
            <span>Record New Message</span>
          </button>
        </div>

        {/* Tabs with counts */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("scheduled")}
            className={`pb-4 font-semibold transition flex items-center gap-2 ${
              activeTab === "scheduled"
                ? "text-[#6467f2] border-b-2 border-[#6467f2]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>Scheduled</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === "scheduled"
                  ? "bg-[#6467f2] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {stats.scheduled}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("delivered")}
            className={`pb-4 font-semibold transition flex items-center gap-2 ${
              activeTab === "delivered"
                ? "text-[#6467f2] border-b-2 border-[#6467f2]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>Delivered</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === "delivered"
                  ? "bg-[#6467f2] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {stats.delivered}
            </span>
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
