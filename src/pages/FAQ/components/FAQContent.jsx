import { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-[#6467f2] transition-colors"
      >
        <h3 className="text-lg font-semibold text-[#111118] pr-4">
          {question}
        </h3>
        <span
          className={`text-2xl text-[#6467f2] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="pb-5 text-gray-700 leading-relaxed text-base">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQContent = () => {
  const faqs = [
    {
      question: "What is Yonder Mail?",
      answer:
        "Yonder Mail is a platform that allows you to record video messages to your future self and schedule them to be delivered at a future date. Capture your thoughts, feelings, goals, and reflections today, and receive them when you need them most.",
    },
    {
      question: "How do I record and schedule a message?",
      answer:
        "It's simple! Record a video message using your webcam, preview it, and then schedule when you want to receive it. We'll securely store your video and deliver it to you exactly when scheduled.",
    },
    {
      question: "Is my video message secure?",
      answer:
        "Absolutely! All video messages are encrypted during transmission and storage. Your messages are completely private and only accessible to you at the scheduled delivery time.",
    },
    {
      question: "Can I cancel a message?",
      answer:
        "Yes! You can cancel any message before it's delivered. Simply go to your 'My Messages' page, find the scheduled message, and use the cancel option.",
    },
    {
      question: "How far in advance can I schedule a message?",
      answer:
        "You can schedule messages up to 12 months in advance! Your message will be safely stored and delivered exactly when scheduled, even if you're not logged in.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f9fafc] to-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111118] mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Yonder Mail. Can't find what
            you're looking for? Contact us!
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 lg:p-12">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQContent;
