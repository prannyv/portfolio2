import React from 'react';

/**
 * Hook to run a callback immediately after the page paint completes
 * Useful for high-priority tasks that should start right after initial render
 */
export function useAfterPaint(callback: () => void, deps: React.DependencyList = []) {
  React.useEffect(() => {
    // Use requestAnimationFrame to ensure it runs after paint
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        callback();
      });
    });
    return () => cancelAnimationFrame(rafId);
  }, deps);
}

/**
 * Hook to run a callback when the browser is idle
 * Useful for medium-priority tasks that can wait for idle time
 * @param callback - Function to run on idle
 * @param timeout - Maximum time to wait before executing (default: 100ms)
 * @param priority - 'high' runs first, 'low' runs later (default: 'normal')
 */
export function useIdleCallback(
  callback: () => void,
  deps: React.DependencyList = [],
  timeout: number = 100,
  priority: 'high' | 'normal' | 'low' = 'normal'
) {
  React.useEffect(() => {
    if (!('requestIdleCallback' in window)) {
      // Fallback for browsers without requestIdleCallback
      const timer = setTimeout(callback, priority === 'high' ? 0 : priority === 'low' ? 100 : 50);
      return () => clearTimeout(timer);
    }

    // For high priority, use shorter timeout to run sooner
    const adjustedTimeout = priority === 'high' ? Math.min(timeout, 50) : timeout;
    
    const id = requestIdleCallback(
      callback,
      { timeout: adjustedTimeout }
    );
    
    return () => cancelIdleCallback(id);
  }, deps);
}

