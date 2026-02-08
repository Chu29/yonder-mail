import RecordingHeader from "./components/RecordingHeader";
import WebcamPreview from "./components/WebcamPreview";
import ControlPanel from "./components/ControlPanel";
import PrivacyNotice from "./components/PrivacyNotice";
import Timer from "./components/Timer";

const RecordingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RecordingHeader />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Timer */}
        <div className="flex justify-center mb-4">
          <Timer maxDuration={300} />
        </div>

        {/* Webcam Preview */}
        <div className="mb-8">
          <WebcamPreview />
        </div>

        {/* Control Buttons */}
        <ControlPanel />

        {/* Privacy Notice */}
        <PrivacyNotice />
      </div>
    </div>
  );
};

export default RecordingPage;
