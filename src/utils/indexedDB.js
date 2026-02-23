// IndexedDB utilities for storing video recordings
const DB_NAME = "YonderMailDB";
const DB_VERSION = 1;
const STORE_NAME = "recordings";

// Open or create IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

// Save recording to IndexedDB
export const saveRecording = async (blob) => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const recording = {
      id: "current_recording",
      blob: blob,
      timestamp: Date.now(),
      mimeType: blob.type,
    };

    return new Promise((resolve, reject) => {
      const request = store.put(recording);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error("Error saving recording to IndexedDB:", err);
    throw err;
  }
};

// Load recording from IndexedDB
export const loadRecording = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get("current_recording");
      request.onsuccess = () => {
        if (request.result && request.result.blob) {
          resolve(request.result.blob);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error("Error loading recording from IndexedDB:", err);
    return null;
  }
};

// Delete recording from IndexedDB
export const deleteRecording = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.delete("current_recording");
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error("Error deleting recording from IndexedDB:", err);
    throw err;
  }
};
