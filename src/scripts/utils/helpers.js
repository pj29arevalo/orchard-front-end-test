/**
 * Utility functions for the application
 */

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} Whether element is visible
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Create optimized image element with loading states
 * @param {Object} imageData - Image configuration object
 * @returns {HTMLImageElement} Configured image element
 */
export function createOptimizedImage(imageData) {
  const img = document.createElement('img');
  img.src = imageData.src;
  img.alt = imageData.alt;
  img.loading = 'lazy';
  
  if (imageData.classes) {
    img.className = imageData.classes.join(' ');
  }
  
  return img;
}

/**
 * Log analytics event (placeholder for real analytics)
 * @param {string} eventName - Name of the event
 * @param {Object} eventData - Event data object
 */
export function logAnalyticsEvent(eventName, eventData) {
  console.group(`🔍 Analytics Event: ${eventName}`);
  console.log('Event Data:', eventData);
  console.log('Timestamp:', new Date().toISOString());
  console.groupEnd();
  
  // In production, this would send to your analytics service
  // Example: gtag('event', eventName, eventData);
}
