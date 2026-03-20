import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  saveRecording,
  loadRecording,
  deleteRecording,
} from "../utils/indexedDB";

const RecordingContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRecording = () => {
  const context = useContext(RecordingContext);
  if (!context) {
    throw new Error("useRecording must be used within RecordingProvider");
  }
  return context;
};

export const RecordingProvider = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState(0);
  const [facingMode, setFacingMode] = useState("user"); // 'user' or 'environment'
  const [isLoadingRecording, setIsLoadingRecording] = useState(true);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Helper function to setup MediaRecorder (extracted to avoid duplication)
  const setupMediaRecorder = useCallback((mediaStream, onStopCallback) => {
    const mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: "video/webm;codecs=vp9,opus",
    });

    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = onStopCallback;

    return mediaRecorder;
  }, []);

  // Load recording from IndexedDB on mount
  useEffect(() => {
    const loadSavedRecording = async () => {
      try {
        const blob = await loadRecording();
        if (blob) {
          const url = URL.createObjectURL(blob);
          setRecordedBlob(blob);
          setRecordedUrl(url);
          console.log("Recording loaded from IndexedDB");
        }
      } catch (err) {
        console.error("Error loading recording from IndexedDB:", err);
        await deleteRecording();
      } finally {
        setIsLoadingRecording(false);
      }
    };

    loadSavedRecording();
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: facingMode,
        },
        audio: true,
      });

      setStream(mediaStream);
      chunksRef.current = [];

      const mediaRecorder = setupMediaRecorder(mediaStream, async () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedBlob(blob);
        setRecordedUrl(url);

        // Save to IndexedDB
        try {
          await saveRecording(blob);
          console.log("Recording saved to IndexedDB");
        } catch (err) {
          console.error("Error saving recording to IndexedDB:", err);
        }

        // Stop all tracks
        mediaStream.getTracks().forEach((track) => track.stop());
        setStream(null);
      });

      mediaRecorder.start(1000); // Capture data every second
      setIsRecording(true);
      setDuration(0);
    } catch (err) {
      console.error("Error starting recording:", err);
      setError(err.message || "Failed to access camera/microphone");
    }
  }, [facingMode, setupMediaRecorder]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  }, [isRecording]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  }, [isRecording, isPaused]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  }, [isRecording, isPaused]);

  const resetRecording = useCallback(async () => {
    // Clean up existing recording
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setIsRecording(false);
    setIsPaused(false);
    setRecordedBlob(null);
    setRecordedUrl(null);
    setStream(null);
    setError(null);
    setDuration(0);
    chunksRef.current = [];

    // Clear from IndexedDB
    try {
      await deleteRecording();
      console.log("Recording deleted from IndexedDB");
    } catch (err) {
      console.error("Error deleting recording:", err);
    }
  }, [recordedUrl, stream]);

  const flipCamera = useCallback(async () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);

    // If currently recording, restart with new camera
    if (stream) {
      const wasRecording = isRecording;
      const wasPaused = isPaused;
      const currentDuration = duration;

      // Stop current stream
      stream.getTracks().forEach((track) => track.stop());

      try {
        // Get new stream with flipped camera
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: newFacingMode,
          },
          audio: true,
        });

        setStream(mediaStream);

        // If was recording, restart recording with new stream
        if (wasRecording) {
          const mediaRecorder = setupMediaRecorder(mediaStream, () => {
            const blob = new Blob(chunksRef.current, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            setRecordedBlob(blob);
            setRecordedUrl(url);

            mediaStream.getTracks().forEach((track) => track.stop());
            setStream(null);
          });

          mediaRecorder.start(1000);
          setDuration(currentDuration);

          if (wasPaused) {
            mediaRecorder.pause();
          }
        }
      } catch (err) {
        console.error("Error flipping camera:", err);
        setError(err.message || "Failed to flip camera");
      }
    }
  }, [facingMode, stream, isRecording, isPaused, duration, setupMediaRecorder]);

  const value = useMemo(
    () => ({
      isRecording,
      isPaused,
      recordedBlob,
      recordedUrl,
      stream,
      error,
      duration,
      facingMode,
      isLoadingRecording,
      setDuration,
      startRecording,
      stopRecording,
      pauseRecording,
      resumeRecording,
      resetRecording,
      flipCamera,
    }),
    [
      isRecording,
      isPaused,
      recordedBlob,
      recordedUrl,
      stream,
      error,
      duration,
      facingMode,
      isLoadingRecording,
      startRecording,
      stopRecording,
      pauseRecording,
      resumeRecording,
      resetRecording,
      flipCamera,
    ],
  );

  return (
    <RecordingContext.Provider value={value}>
      {children}
    </RecordingContext.Provider>
  );
};
