// providers/SessionProvider.tsx
"use client";

/**
 * Get or create a device ID for the current browser
 */
export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") {
    return crypto.randomUUID();
  }

  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
}
