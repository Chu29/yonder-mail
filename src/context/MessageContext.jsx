import { createContext, useContext, useState, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MessageContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within MessageProvider");
  }
  return context;
};

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useLocalStorage("yonder_messages", []);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [_isLoading, _setIsLoading] = useState(false);

  const createMessage = useCallback((videoBlob, videoUrl) => {
    const message = {
      id: Date.now().toString(),
      videoBlob,
      videoUrl,
      createdAt: new Date().toISOString(),
      status: "draft", // draft, scheduled, sent, delivered
    };

    setCurrentMessage(message);
    return message;
  }, []);

  const scheduleMessage = useCallback(
    (messageId, scheduleData) => {
      const { deliveryDate, deliveryTime, deliveryMethod, recipientEmail } =
        scheduleData;

      setCurrentMessage((current) => {
        const updatedMessage = {
          ...current,
          id: messageId || current?.id,
          deliveryDate,
          deliveryTime,
          deliveryMethod,
          recipientEmail: recipientEmail || "user@example.com",
          scheduledAt: new Date().toISOString(),
          status: "scheduled",
        };

        setMessages((prev) => [...prev, updatedMessage]);
        return null;
      });

      return true;
    },
    [setMessages],
  );

  const deleteMessage = useCallback(
    (messageId) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    },
    [setMessages],
  );

  const updateMessageStatus = useCallback(
    (messageId, newStatus) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: newStatus } : msg,
        ),
      );
    },
    [setMessages],
  );

  const getScheduledMessages = useCallback(() => {
    return messages.filter((msg) => msg.status === "scheduled");
  }, [messages]);

  const getSentMessages = useCallback(() => {
    return messages.filter(
      (msg) => msg.status === "sent" || msg.status === "delivered",
    );
  }, [messages]);

  const clearCurrentMessage = useCallback(() => {
    setCurrentMessage(null);
  }, []);

  const value = {
    messages,
    currentMessage,
    isLoading: _isLoading,
    createMessage,
    scheduleMessage,
    deleteMessage,
    updateMessageStatus,
    getScheduledMessages,
    getSentMessages,
    clearCurrentMessage,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
