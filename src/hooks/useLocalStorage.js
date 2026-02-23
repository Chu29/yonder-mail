import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook to manage localStorage with React state
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if key doesn't exist
 * @returns {[value, setValue, removeValue]} - Current value, setter function, and remove function
 */
export const useLocalStorage = (key, initialValue) => {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  // Track if we're currently updating to avoid loops
  const isUpdatingRef = useRef(false);

  // Update localStorage when state changes
  useEffect(() => {
    // Skip if we're currently updating to avoid unnecessary writes
    if (isUpdatingRef.current) {
      isUpdatingRef.current = false;
      return;
    }

    try {
      if (storedValue === null || storedValue === undefined) {
        localStorage.removeItem(key);
      } else {
        const serialized = JSON.stringify(storedValue);
        // Only update if value actually changed
        const current = localStorage.getItem(key);
        if (current !== serialized) {
          localStorage.setItem(key, serialized);
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Wrapped setter that updates the ref
  const setValue = useCallback((value) => {
    isUpdatingRef.current = true;
    setStoredValue(value);
  }, []);

  // Function to remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue, removeValue];
};
