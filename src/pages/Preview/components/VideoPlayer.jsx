import { Play, Volume2, Settings, Maximize } from "lucide-react";
import { useState } from "react";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(15); // 0:37 of 2:23 is about 27%

  return (
    <div className="bg-black rounded-2xl overflow-hidden shadow-xl mb-8">
      {/* Video Area */}
      <div className="relative aspect-video bg-black flex items-center justify-center">
        {/* Play Button Overlay */}
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="relative z-10 group"
          >
            <div className="w-20 h-20 bg-[#6467f2] rounded-full flex items-center justify-center shadow-2xl hover:bg-[#5456d4] transition transform hover:scale-110">
              <Play size={32} className="text-white ml-1" fill="white" />
            </div>
          </button>
        )}

        {/* Video placeholder */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black"></div>
      </div>

      {/* Controls Bar */}
      <div className="bg-black px-4 py-3">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6467f2] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button className="text-white hover:text-[#6467f2] transition">
              <Play size={18} fill="white" />
            </button>

            {/* Volume */}
            <button className="text-white hover:text-[#6467f2] transition">
              <Volume2 size={18} />
            </button>

            {/* Time */}
            <span className="text-white text-sm font-mono">0:37 / 2:23</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Settings */}
            <button className="text-white hover:text-[#6467f2] transition">
              <Settings size={18} />
            </button>

            {/* Fullscreen */}
            <button className="text-white hover:text-[#6467f2] transition">
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
