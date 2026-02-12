import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import VideoPlayer from "./components/VideoPlayer";
import PreviewActions from "./components/PreviewActions";
import Footer from "../Home/components/Footer";
import { useRecording } from "../../context/RecordingContext";
import { useMessages } from "../../context/MessageContext";

const PreviewPage = () => {
  const navigate = useNavigate();
  const { recordedUrl, recordedBlob, isLoadingRecording } = useRecording();
  const { createMessage } = useMessages();
  const messageCreatedRef = useRef(false);

  useEffect(() => {
    // Wait for loading to complete
    if (isLoadingRecording) return;

    // Redirect if no recording exists after loading
    if (!recordedUrl) {
      navigate("/recording");
      return;
    }

    // Create message from recording only once
    if (!messageCreatedRef.current) {
      createMessage(recordedBlob, recordedUrl);
      messageCreatedRef.current = true;
    }
  }, [recordedUrl, recordedBlob, isLoadingRecording, navigate, createMessage]);

  // Show loading state while checking for recording
  if (isLoadingRecording) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6467f2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your recording...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader />

      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Preview Your Message
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Check your audio and video before sending your message to the
            future.
          </p>
        </div>

        {/* Video Player */}
        <VideoPlayer />

        {/* Action Buttons */}
        <PreviewActions />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PreviewPage;
