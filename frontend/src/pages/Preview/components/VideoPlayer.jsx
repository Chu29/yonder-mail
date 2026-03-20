import { Play, Pause, Volume2, Maximize, Minimize } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRecording } from "../../../context/RecordingContext";

const VideoPlayer = () => {
  const { recordedUrl } = useRecording();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Memoize helper functions
  const getDuration = useCallback((video) => {
    let videoDuration = video.duration;
    // If duration is not available, try seekable range
    if (
      !isFinite(videoDuration) &&
      video.seekable &&
      video.seekable.length > 0
    ) {
      videoDuration = video.seekable.end(0);
    }
    return videoDuration && isFinite(videoDuration) && videoDuration > 0
      ? videoDuration
      : 0;
  }, []);

  const formatTime = useCallback((seconds) => {
    if (!isFinite(seconds) || isNaN(seconds)) {
      return "0:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Consolidated effect for all video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateDuration = () => {
      const videoDuration = getDuration(video);
      if (videoDuration > 0) {
        setDuration(videoDuration);
      }
    };

    const updateProgress = () => {
      const videoDuration = getDuration(video);
      if (videoDuration > 0) {
        setDuration(videoDuration);
        const progress = (video.currentTime / videoDuration) * 100 || 0;
        setProgress(progress);
      }
      setCurrentTime(video.currentTime);
    };

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);

    // Event listener registry for easier management
    const eventListeners = [
      { target: video, event: "timeupdate", handler: updateProgress },
      { target: video, event: "loadedmetadata", handler: updateDuration },
      { target: video, event: "loadeddata", handler: updateDuration },
      { target: video, event: "durationchange", handler: updateDuration },
      { target: video, event: "canplay", handler: updateDuration },
      { target: video, event: "ended", handler: handleEnded },
      { target: video, event: "play", handler: handlePlay },
      { target: video, event: "pause", handler: handlePause },
      {
        target: document,
        event: "fullscreenchange",
        handler: handleFullscreenChange,
      },
    ];

    // Add all event listeners
    eventListeners.forEach(({ target, event, handler }) => {
      target.addEventListener(event, handler);
    });

    // Force load if video is ready
    if (video.readyState >= 1) {
      updateDuration();
    } else {
      video.load();
    }

    // Cleanup all event listeners
    return () => {
      eventListeners.forEach(({ target, event, handler }) => {
        target.removeEventListener(event, handler);
      });
    };
  }, [recordedUrl, getDuration]);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isPlaying) {
        video.pause();
      } else {
        await video.play();
      }
    } catch (err) {
      console.error("Error playing video:", err);
    }
  }, [isPlaying]);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-black rounded-2xl overflow-hidden shadow-xl mb-8"
    >
      {/* Video Area */}
      <div className="relative aspect-video bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={recordedUrl}
          className="w-full h-full object-contain"
          onClick={togglePlay}
          preload="auto"
        />

        {/* Duration Badge */}
        {duration > 0 && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-mono">
            {formatTime(duration)}
          </div>
        )}

        {/* Play Button Overlay */}
        {!isPlaying && (
          <button onClick={togglePlay} className="absolute z-10 group">
            <div className="w-20 h-20 bg-[#6467f2] rounded-full flex items-center justify-center shadow-2xl hover:bg-[#5456d4] transition transform hover:scale-110">
              <Play size={32} className="text-white ml-1" fill="white" />
            </div>
          </button>
        )}
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
            <button
              onClick={togglePlay}
              className="text-white hover:text-[#6467f2] transition"
            >
              {isPlaying ? (
                <Pause size={18} />
              ) : (
                <Play size={18} fill="white" />
              )}
            </button>

            {/* Volume */}
            <button className="text-white hover:text-[#6467f2] transition">
              <Volume2 size={18} />
            </button>

            {/* Time */}
            <span className="text-white text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-[#6467f2] transition"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
