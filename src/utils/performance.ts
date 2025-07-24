/**
 * Performance monitoring utilities
 * Tracks component render times and API response times
 */

class PerformanceMonitor {
  private timers: Map<string, number> = new Map();
  private isDevelopment = import.meta.env.DEV;

  /**
   * Start timing an operation
   */
  start(name: string): void {
    if (this.isDevelopment) {
      // Always set the timer, overwriting if it already exists
      this.timers.set(name, performance.now());
    }
  }

  /**
   * End timing an operation and log the result
   */
  end(name: string): number {
    if (!this.isDevelopment) return 0;

    const startTime = this.timers.get(name);
    if (!startTime) {
      // Silently return 0 if timer doesn't exist (React Strict Mode can cause this)
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(name);
    
    // Log slow operations
    if (duration > 100) {
      console.warn(`🐌 Slow operation: ${name} took ${duration.toFixed(2)}ms`);
    } else if (duration > 50) {
      console.info(`⚠️ Medium operation: ${name} took ${duration.toFixed(2)}ms`);
    } else {
      console.debug(`✅ Fast operation: ${name} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  /**
   * Measure API response time
   */
  measureAsync<T>(name: string, operation: Promise<T>): Promise<T> {
    if (!this.isDevelopment) return operation;

    // For React Strict Mode compatibility, only start timer if not already running
    if (!this.timers.has(name)) {
      this.start(name);
    }
    
    return operation.finally(() => {
      this.end(name);
    });
  }
}

export const perf = new PerformanceMonitor();
