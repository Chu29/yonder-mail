import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { RecordingProvider } from "./context/RecordingContext";
import { MessageProvider } from "./context/MessageContext";
import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <MessageProvider>
          <RecordingProvider>
            <App />
          </RecordingProvider>
        </MessageProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
);
