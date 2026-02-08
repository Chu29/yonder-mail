import { Lock, Trash2 } from "lucide-react";
import { useMessages } from "../../../context/MessageContext";

const MessagesList = ({ activeTab }) => {
  const { messages: userMessages, deleteMessage } = useMessages();

  // Use actual messages or fallback to mock data for demo
  const mockMessages = [
    {
      id: 1,
      title: "Birthday Wish 2026",
      deliveryDate: "2028-12-15",
      createdDate: "2023-10-12",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Note to Self",
      deliveryDate: "2026-08-12",
      createdDate: "2023-11-05",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Wedding Anniversary",
      deliveryDate: "2029-06-20",
      createdDate: "2023-12-20",
      status: "scheduled",
    },
    {
      id: 4,
      title: "Future Me",
      deliveryDate: "2027-01-15",
      createdDate: "2024-01-15",
      status: "scheduled",
    },
    {
      id: 5,
      title: "Graduation Day",
      deliveryDate: "2023-06-10",
      createdDate: "2023-05-01",
      status: "delivered",
    },
  ];

  // Map user messages to expected format
  const formattedUserMessages = userMessages.map((msg) => ({
    id: msg.id,
    title: `Message from ${new Date(msg.createdAt).toLocaleDateString()}`,
    deliveryDate: msg.deliveryDate,
    createdDate: msg.createdAt?.split("T")[0],
    status: msg.status,
    videoUrl: msg.videoUrl,
  }));

  const allMessages = [...formattedUserMessages, ...mockMessages];

  const calculateTimeUntilDelivery = (deliveryDate) => {
    const today = new Date("2026-02-01");
    const delivery = new Date(deliveryDate);
    const diffTime = delivery - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "DELIVERED";
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0) return `DELIVERING IN ${years} YEAR${years > 1 ? "S" : ""}`;
    if (months > 0)
      return `DELIVERING IN ${months} MONTH${months > 1 ? "S" : ""}`;
    return `DELIVERING IN ${diffDays} DAY${diffDays > 1 ? "S" : ""}`;
  };

  const filteredMessages = allMessages.filter((msg) => {
    if (activeTab === "scheduled") return msg.status === "scheduled";
    if (activeTab === "delivered")
      return msg.status === "sent" || msg.status === "delivered";
    return false;
  });

  const handleDelete = (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteMessage(messageId);
    }
  };

  return (
    <>
      {filteredMessages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className="group cursor-pointer hover:shadow-lg transition"
            >
              {/* Card Image */}
              <div className="relative w-full h-40 rounded-xl bg-gray-200 shadow-md overflow-hidden mb-4 flex items-center justify-center">
                {/* Lock Icon */}
                <Lock size={40} className="text-gray-400" />
              </div>

              {/* Card Info */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#6467f2] transition flex-1">
                    {message.title}
                  </h3>
                  {message.videoUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete message"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <p className="text-xs font-bold text-[#6467f2] mb-1">
                  {calculateTimeUntilDelivery(message.deliveryDate)}
                </p>
                <p className="text-xs text-gray-500">
                  Created{" "}
                  {new Date(message.createdDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No {activeTab} messages yet.</p>
        </div>
      )}
    </>
  );
};

export default MessagesList;
