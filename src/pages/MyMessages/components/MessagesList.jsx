import { useMemo, useCallback, useState } from "react";
import { Trash2, Calendar, Mail, Clock, Video } from "lucide-react";
import { useMessages } from "../../../context/MessageContext";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router";
import Modal from "../../../components/Modal";

// Date formatting options - reusable constant
const DATE_FORMAT_OPTIONS = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

// Moved outside component to avoid recreation on each render
const calculateTimeUntilDelivery = (deliveryDate) => {
  const today = new Date();
  const delivery = new Date(deliveryDate);
  const diffTime = delivery - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "DELIVERED";

  // Calculate actual calendar months difference
  const yearsDiff = delivery.getFullYear() - today.getFullYear();
  const monthsDiff = delivery.getMonth() - today.getMonth();
  const totalMonths = yearsDiff * 12 + monthsDiff;

  // If delivery day is earlier in the month, subtract 1 month
  const adjustedMonths =
    delivery.getDate() < today.getDate() ? totalMonths - 1 : totalMonths;

  const years = Math.floor(adjustedMonths / 12);
  const months = adjustedMonths % 12;

  if (years > 0) return `DELIVERING IN ${years} YEAR${years > 1 ? "S" : ""}`;
  if (months > 0)
    return `DELIVERING IN ${months} MONTH${months > 1 ? "S" : ""}`;
  return `DELIVERING IN ${diffDays} DAY${diffDays > 1 ? "S" : ""}`;
};

const EmptyState = ({ type }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        {type === "scheduled" ? (
          <Calendar size={40} className="text-gray-400" />
        ) : (
          <Mail size={40} className="text-gray-400" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {type === "scheduled"
          ? "No Scheduled Messages"
          : "No Delivered Messages"}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {type === "scheduled"
          ? "Create your first video message and schedule it to be delivered in the future. Your message will travel through time!"
          : "Messages you've recorded and scheduled will appear here once they've been delivered to their recipients."}
      </p>
      {type === "scheduled" && (
        <button
          onClick={() => navigate("/recording")}
          className="bg-[#6467f2] hover:bg-[#5456d4] text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <Video size={20} />
          <span>Record Your First Message</span>
        </button>
      )}
    </div>
  );
};

const MessagesList = ({ activeTab }) => {
  const { messages, deleteMessage } = useMessages();
  const toast = useToast();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Memoize filtered messages to avoid recalculation on every render
  const filteredMessages = useMemo(() => {
    const safeMessages = Array.isArray(messages) ? messages : [];

    if (activeTab === "scheduled") {
      return safeMessages.filter((msg) => msg.status === "scheduled");
    }
    if (activeTab === "delivered") {
      return safeMessages.filter(
        (msg) => msg.status === "sent" || msg.status === "delivered",
      );
    }
    return [];
  }, [messages, activeTab]);

  // Memoize delete handler to avoid recreation
  const handleDeleteClick = useCallback((messageId, messageTitle) => {
    setMessageToDelete({ id: messageId, title: messageTitle });
    setDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (messageToDelete) {
      deleteMessage(messageToDelete.id);
      toast.success("Message deleted successfully!");
      setMessageToDelete(null);
    }
  }, [messageToDelete, deleteMessage, toast]);

  if (filteredMessages.length === 0) {
    return <EmptyState type={activeTab} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredMessages.map((message) => (
        <div
          key={message.id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          {/* Card Image/Video */}
          <div className="relative w-full h-40 bg-linear-to-br from-purple-100 to-blue-100 overflow-hidden flex items-center justify-center">
            {message.videoUrl ? (
              <>
                <video
                  src={message.videoUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                    <Video size={24} className="text-[#6467f2] ml-0.5" />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <Clock size={40} className="text-gray-400" />
              </div>
            )}
          </div>

          {/* Card Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-[#6467f2] transition line-clamp-2 text-sm">
                  {message.title || message.recipientEmail || "Video Message"}
                </h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(
                    message.id,
                    message.title || "this message",
                  );
                }}
                className="text-gray-400 hover:text-red-600 transition shrink-0 p-1 hover:bg-red-50 rounded"
                title="Delete message"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-[#6467f2] uppercase tracking-wide">
                {message.deliveryDate
                  ? calculateTimeUntilDelivery(message.deliveryDate)
                  : "NO DELIVERY DATE"}
              </p>

              {message.deliveryDate && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Calendar size={12} className="shrink-0" />
                  <span>
                    {new Date(message.deliveryDate).toLocaleDateString(
                      "en-US",
                      DATE_FORMAT_OPTIONS,
                    )}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Mail size={12} className="shrink-0" />
                <span className="truncate">{message.recipientEmail}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-1 border-t border-gray-100">
                <Clock size={12} className="shrink-0" />
                <span>
                  Created{" "}
                  {new Date(message.createdAt).toLocaleDateString(
                    "en-US",
                    DATE_FORMAT_OPTIONS,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setMessageToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Message?"
        message={`Are you sure you want to delete "${messageToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmStyle="danger"
      />
    </div>
  );
};

export default MessagesList;
