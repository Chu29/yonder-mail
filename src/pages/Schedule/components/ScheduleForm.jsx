import {
  Calendar,
  Mail,
  MessageSquareMore,
  Lock,
  Info,
  PenLine,
} from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMessages } from "../../../context/MessageContext";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";

const ScheduleForm = () => {
  const navigate = useNavigate();
  const { currentMessage, scheduleMessage } = useMessages();
  const { user } = useAuth();
  const toast = useToast();
  const [messageTitle, setMessageTitle] = useState("");
  const [selectedMonths, setSelectedMonths] = useState(null); // 3, 6, or 12
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate min and max dates
  const minDate = useMemo(() => {
    const today = new Date();
    const min = new Date(today);
    min.setDate(min.getDate() + 1); // At least tomorrow
    return min;
  }, []);

  const maxDate = useMemo(() => {
    const today = new Date();
    const max = new Date(today);
    max.setMonth(max.getMonth() + 12); // Max 12 months
    return max;
  }, []);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Quick date selection helpers
  const setQuickDate = (months) => {
    setSelectedMonths(months);
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    setDeliveryDate(formatDate(date));
    // Clear date error when selecting
    setErrors((prev) => ({ ...prev, deliveryDate: "" }));
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    // Validate title
    if (!messageTitle.trim()) {
      newErrors.messageTitle = "Message title is required";
    } else if (messageTitle.trim().length < 3) {
      newErrors.messageTitle = "Title must be at least 3 characters";
    }

    // Validate date
    if (!deliveryDate) {
      newErrors.deliveryDate = "Delivery date is required";
    } else {
      const selectedDate = new Date(deliveryDate);
      const minAllowed = new Date(minDate);
      const maxAllowed = new Date(maxDate);

      if (selectedDate < minAllowed) {
        newErrors.deliveryDate = "Date must be at least tomorrow";
      } else if (selectedDate > maxAllowed) {
        newErrors.deliveryDate = "Date cannot be more than 12 months away";
      }
    }

    // Validate time
    if (!deliveryTime) {
      newErrors.deliveryTime = "Delivery time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [messageTitle, deliveryDate, deliveryTime, minDate, maxDate]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Prevent double submission
      if (isSubmitting) {
        return;
      }

      if (!currentMessage) {
        toast.error("No recording found. Please record a message first.");
        navigate("/recording");
        return;
      }

      // Validate all fields
      if (!validateForm()) {
        toast.error("All fields are required");
        return;
      }

      setIsSubmitting(true);

      scheduleMessage(currentMessage.id, {
        title: messageTitle.trim(),
        deliveryDate,
        deliveryTime,
        deliveryMethod,
        recipientEmail: user?.email || "user@example.com",
      });

      toast.success(
        `Message "${messageTitle.trim()}" scheduled successfully for ${new Date(deliveryDate).toLocaleDateString()}!`,
      );

      navigate("/confirmation");
    },
    [
      isSubmitting,
      currentMessage,
      validateForm,
      scheduleMessage,
      messageTitle,
      deliveryDate,
      deliveryTime,
      deliveryMethod,
      user?.email,
      toast,
      navigate,
    ],
  );

  return (
    <div className="space-y-6">
      {/* Pick a time card */}
      <div className="bg-[#6467f2] rounded-xl p-4 flex items-center gap-3 text-white">
        <Calendar size={24} />
        <span className="font-semibold text-base sm:text-lg">
          Pick a time for your future self
        </span>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
        {/* Message Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Message Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <PenLine size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={messageTitle}
              onChange={(e) => {
                setMessageTitle(e.target.value);
                setErrors((prev) => ({ ...prev, messageTitle: "" }));
              }}
              placeholder="e.g., Birthday Wish 2027, Note to Future Self..."
              maxLength={60}
              className={`w-full pl-12 pr-4 py-3 border ${
                errors.messageTitle
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#6467f2]"
              } rounded-lg focus:ring-2 focus:border-transparent outline-none transition`}
              required
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            {errors.messageTitle ? (
              <p className="text-xs text-red-500">{errors.messageTitle}</p>
            ) : (
              <p className="text-xs text-gray-500">
                Give your message a meaningful title
              </p>
            )}
            <p className="text-xs text-gray-500">{messageTitle.length}/60</p>
          </div>
        </div>

        {/* Date Selection - Fixed Options */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Delivery Date <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setQuickDate(3)}
              className={`px-4 py-3 border-2 rounded-lg font-semibold transition ${
                selectedMonths === 3
                  ? "bg-purple-600 border-purple-600 text-white shadow-lg"
                  : "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300"
              }`}
            >
              3 Months
            </button>
            <button
              type="button"
              onClick={() => setQuickDate(6)}
              className={`px-4 py-3 border-2 rounded-lg font-semibold transition ${
                selectedMonths === 6
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                  : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
              }`}
            >
              6 Months
            </button>
            <button
              type="button"
              onClick={() => setQuickDate(12)}
              className={`px-4 py-3 border-2 rounded-lg font-semibold transition ${
                selectedMonths === 12
                  ? "bg-green-600 border-green-600 text-white shadow-lg"
                  : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300"
              }`}
            >
              12 Months
            </button>
          </div>
          {selectedMonths && deliveryDate && (
            <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Delivery scheduled for:</span>{" "}
                <span className="text-[#6467f2] font-semibold">
                  {new Date(deliveryDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
          )}
          {errors.deliveryDate && (
            <p className="text-xs text-red-500 mt-2">{errors.deliveryDate}</p>
          )}
        </div>

        {/* Delivery Time */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Delivery Time <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="time"
              value={deliveryTime}
              onChange={(e) => {
                setDeliveryTime(e.target.value);
                setErrors((prev) => ({ ...prev, deliveryTime: "" }));
              }}
              className={`w-full px-4 py-3 border ${
                errors.deliveryTime
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#6467f2]"
              } rounded-lg focus:ring-2 focus:border-transparent outline-none transition`}
              required
            />
          </div>
          {errors.deliveryTime && (
            <p className="text-xs text-red-500 mt-1">{errors.deliveryTime}</p>
          )}
        </div>

        {/* Delivery Method */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Delivery Method
          </label>
          <div className="space-y-3">
            {/* Email Option */}
            <label className="flex items-center gap-4 p-4 border-2 border-[#6467f2] rounded-xl cursor-pointer hover:bg-gray-50 transition">
              <input
                type="radio"
                name="deliveryMethod"
                value="email"
                checked={deliveryMethod === "email"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="w-5 h-5 text-[#6467f2] focus:ring-[#6467f2]"
              />
              <Mail size={24} className="text-[#6467f2]" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-sm text-gray-600">
                  Sent to your verified account
                </p>
              </div>
            </label>

            {/* WhatsApp Option (Coming Soon) */}
            <div className="relative flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl opacity-60 cursor-not-allowed bg-gray-50">
              <input
                type="radio"
                name="deliveryMethod"
                value="whatsapp"
                disabled
                className="w-5 h-5 text-gray-400"
              />
              <MessageSquareMore size={24} className="text-gray-400" />
              <div className="flex-1">
                <p className="font-semibold text-gray-500">WhatsApp</p>
                <p className="text-sm text-gray-500">Direct messaging</p>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-200 px-2 py-1 rounded">
                COMING SOON
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-[#6467f2] hover:bg-[#5456d4] text-white font-semibold py-4 rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Scheduling..." : "Schedule message"}
        </button>

        {/* Privacy Notice */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Lock size={16} className="text-gray-500" />
          <span>Your message will remain private until delivery.</span>
        </div>
      </div>

      {/* How it works info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-blue-900 mb-1">How it works</h3>
          <p className="text-sm text-blue-800 mb-2">
            Once you schedule your message, we store it securely using
            end-to-end encryption. On the chosen date, we'll automatically send
            you a notification and the link to view your video.
          </p>
          <p className="text-xs text-blue-700">
            📅 Schedule messages from <strong>tomorrow</strong> up to{" "}
            <strong>12 months</strong> in the future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;
