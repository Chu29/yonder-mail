import React from "react";
import PreviewHeader from "./components/PreviewHeader";
import VideoPlayer from "./components/VideoPlayer";
import PreviewActions from "./components/PreviewActions";
import Footer from "../Home/components/Footer";

const PreviewPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PreviewHeader />

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
