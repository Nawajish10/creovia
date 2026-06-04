declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  } else if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event]: ${eventName}`, params);
  }
}
