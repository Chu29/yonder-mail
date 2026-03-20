import { useEffect, useRef } from "react";
import { useRecording } from "../../../context/RecordingContext";
import recHeroImage from "../../../assets/rec-hero-image.png";

const WebcamPreview = () => {
  const { stream, isRecording, error } = useRecording();
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg h-125 flex items-center justify-center bg-black">
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${recHeroImage})` }}
        >
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <p className="text-white text-center px-4">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* HD Preview Label */}
      <div className="absolute top-4 left-4 bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded">
        {stream ? "LIVE" : "HD PREVIEW"}
      </div>

      {/* Status Indicators */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold">
        <span className="bg-gray-800 text-white px-2 py-1 rounded">
          🎤 {stream ? "Mic Active" : "Mic Ready"}
        </span>
        <span className="text-white bg-gray-800 px-2 py-1 rounded">
          {isRecording ? "Recording..." : "Ready to Capture"}
        </span>
      </div>
    </div>
  );
};

export default WebcamPreview;
