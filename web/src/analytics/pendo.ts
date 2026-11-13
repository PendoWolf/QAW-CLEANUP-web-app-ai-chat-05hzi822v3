// Sends Pendo Track Events through the Pendo agent (window.pendo), when it is loaded.
// The agent attaches the visitor and account itself, so properties never include their ids.

/** A Pendo Track Event property value. */
export type TrackProperty = string | number | boolean;

interface PendoAgent {
  track: (event: string, properties?: Record<string, TrackProperty>) => void;
}

declare global {
  interface Window {
    pendo?: PendoAgent;
  }
}

/**
 * Sends a Track Event to Pendo. Does nothing if the Pendo agent isn't loaded, and never
 * throws, so tracking can't break the flow it measures.
 */
export function trackEvent(event: string, properties: Record<string, TrackProperty> = {}): void {
  try {
    window.pendo?.track(event, properties);
  } catch (e) {
    console.warn(`Pendo track "${event}" failed`, e);
  }
}

/** The number of days a trip spans, counting both the start and end dates. */
export function tripLengthDays(startDate: string, endDate: string): number {
  const days = Math.round((Date.parse(endDate) - Date.parse(startDate)) / 86_400_000) + 1;
  return Number.isFinite(days) ? days : 0;
}
