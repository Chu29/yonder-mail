import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
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

  // Ensure messages is always an array (memoized)
  const safeMessages = useMemo(
    () => (Array.isArray(messages) ? messages : []),
    [messages],
  );

  const createMessage = useCallback((videoBlob, videoUrl) => {
    const message = {
      id: Date.now().toString(),
      // Don't store blob in localStorage - keep it only in memory/IndexedDB
      videoBlob: videoBlob,
      videoUrl,
      createdAt: new Date().toISOString(),
      status: "draft", // draft, scheduled, sent, delivered
    };

    setCurrentMessage(message);
    return message;
  }, []);

  const scheduleMessage = useCallback(
    (messageId, scheduleData) => {
      const {
        title,
        deliveryDate,
        deliveryTime,
        deliveryMethod,
        recipientEmail,
      } = scheduleData;

      setCurrentMessage((current) => {
        // Create message without videoBlob for localStorage
        const updatedMessage = {
          id: messageId || current?.id,
          title: title || "Untitled Message",
          videoUrl: current?.videoUrl,
          deliveryDate,
          deliveryTime,
          deliveryMethod,
          recipientEmail: recipientEmail || "user@example.com",
          createdAt: current?.createdAt || new Date().toISOString(),
          scheduledAt: new Date().toISOString(),
          status: "scheduled",
        };

        // Check for duplicates before adding
        setMessages((prev) => {
          const exists = prev.some((msg) => msg.id === updatedMessage.id);
          if (exists) {
            console.warn("Message already scheduled, skipping duplicate");
            return prev;
          }
          return [...prev, updatedMessage];
        });
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
    return safeMessages.filter((msg) => msg.status === "scheduled");
  }, [safeMessages]);

  const getSentMessages = useCallback(() => {
    return safeMessages.filter(
      (msg) => msg.status === "sent" || msg.status === "delivered",
    );
  }, [safeMessages]);

  const clearCurrentMessage = useCallback(() => {
    setCurrentMessage(null);
  }, []);

  const clearAllMessages = useCallback(() => {
    setMessages([]);
    setCurrentMessage(null);
  }, [setMessages]);

  const value = useMemo(
    () => ({
      messages: safeMessages,
      currentMessage,
      createMessage,
      scheduleMessage,
      deleteMessage,
      updateMessageStatus,
      getScheduledMessages,
      getSentMessages,
      clearCurrentMessage,
      clearAllMessages,
    }),
    [
      safeMessages,
      currentMessage,
      createMessage,
      scheduleMessage,
      deleteMessage,
      updateMessageStatus,
      getScheduledMessages,
      getSentMessages,
      clearCurrentMessage,
      clearAllMessages,
    ],
  );

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
