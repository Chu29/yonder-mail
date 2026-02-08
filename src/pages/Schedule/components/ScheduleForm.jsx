import { Calendar, Mail, MessageSquareMore, Lock, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessages } from "../../../context/MessageContext";
import { useAuth } from "../../../context/AuthContext";

const ScheduleForm = () => {
  const navigate = useNavigate();
  const { currentMessage, scheduleMessage } = useMessages();
  const { user } = useAuth();
  const [deliveryDate, setDeliveryDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [deliveryTime, setDeliveryTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  );
  const [deliveryMethod, setDeliveryMethod] = useState("email");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentMessage) {
      alert("No recording found. Please record a message first.");
      navigate("/recording");
      return;
    }

    scheduleMessage(currentMessage.id, {
      deliveryDate,
      deliveryTime,
      deliveryMethod,
      recipientEmail: user?.email || "user@example.com",
    });

    navigate("/confirmation");
  };

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
        {/* Date and Time Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Delivery Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6467f2] focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Delivery Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Delivery Time
            </label>
            <div className="relative">
              <input
                type="time"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6467f2] focus:border-transparent outline-none transition"
              />
            </div>
          </div>
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
          className="w-full bg-[#6467f2] hover:bg-[#5456d4] text-white font-semibold py-4 rounded-xl transition shadow-lg hover:shadow-xl"
        >
          Schedule message
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
          <p className="text-sm text-blue-800">
            Once you schedule your message, we store it securely using
            end-to-end encryption. On the chosen date, we'll automatically send
            you a notification and the link to view your video.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;
