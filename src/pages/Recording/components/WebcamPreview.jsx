import recHeroImage from "../../../assets/rec-hero-image.png";

const WebcamPreview = () => {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-lg p-6 h-125 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${recHeroImage})` }}
    >
      {/* HD Preview Label */}
      <div className="absolute top-4 left-4 bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded">
        HD PREVIEW
      </div>

      {/* Status Indicators */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-gray-700">
        <span className="bg-linear-to-r from-gray-400 to-gray-500 text-white px-2 py-1 rounded">
          🎤 Mic Active
        </span>
        <span className="text-gray-700">Ready to Capture</span>
      </div>
    </div>
  );
};

export default WebcamPreview;
