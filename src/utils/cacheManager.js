/**
 * Cache Manager Utility
 * Provides memory-efficient caching mechanisms for the bot
 */

class CacheManager {
  constructor(options = {}) {
    this.caches = new Map();
    this.defaultTTL = options.defaultTTL || 300000; // 5 minutes default TTL
    this.maxSize = options.maxSize || 100; // Default max entries per cache
    this.cleanupInterval = options.cleanupInterval || 60000; // 1 minute cleanup
    
    // Start the cleanup interval
    this.intervalId = setInterval(() => this.cleanup(), this.cleanupInterval);
  }

  /**
   * Create or get a named cache
   * @param {string} cacheName - Name of the cache
   * @param {Object} options - Cache-specific options
   * @returns {Object} - Cache methods
   */
  getCache(cacheName, options = {}) {
    if (!this.caches.has(cacheName)) {
      const ttl = options.ttl || this.defaultTTL;
      const maxSize = options.maxSize || this.maxSize;
      
      this.caches.set(cacheName, {
        data: new Map(),
        ttl,
        maxSize,
        stats: {
          hits: 0,
          misses: 0,
          sets: 0,
          evictions: 0
        }
      });
    }
    
    const cache = this.caches.get(cacheName);
    
    return {
      /**
       * Get an item from the cache
       * @param {string} key - Cache key
       * @returns {*} - Cached value or undefined if not found/expired
       */
      get: (key) => {
        const item = cache.data.get(key);
        
        if (!item) {
          cache.stats.misses++;
          return undefined;
        }
        
        // Check if the item has expired
        if (item.expiry < Date.now()) {
          cache.data.delete(key);
          cache.stats.misses++;
          return undefined;
        }
        
        cache.stats.hits++;
        return item.value;
      },
      
      /**
       * Set an item in the cache
       * @param {string} key - Cache key
       * @param {*} value - Value to cache
       * @param {number} [customTTL] - Custom TTL in ms for this item
       */
      set: (key, value, customTTL) => {
        // If cache is at max size and this is a new key, evict oldest
        if (cache.data.size >= cache.maxSize && !cache.data.has(key)) {
          const oldestKey = this.findOldestEntry(cache.data);
          if (oldestKey) {
            cache.data.delete(oldestKey);
            cache.stats.evictions++;
          }
        }
        
        const ttl = customTTL || cache.ttl;
        cache.data.set(key, {
          value,
          expiry: Date.now() + ttl,
          created: Date.now()
        });
        
        cache.stats.sets++;
      },
      
      /**
       * Check if a key exists and is not expired
       * @param {string} key - Cache key
       * @returns {boolean} - Whether the key exists and is valid
       */
      has: (key) => {
        const item = cache.data.get(key);
        if (!item) return false;
        if (item.expiry < Date.now()) {
          cache.data.delete(key);
          return false;
        }
        return true;
      },
      
      /**
       * Delete an item from the cache
       * @param {string} key - Cache key
       */
      delete: (key) => {
        cache.data.delete(key);
      },
      
      /**
       * Clear all items from this cache
       */
      clear: () => {
        cache.data.clear();
      },
      
      /**
       * Get cache statistics
       * @returns {Object} - Cache statistics
       */
      getStats: () => ({ ...cache.stats })
    };
  }
  
  /**
   * Find the oldest entry in a cache Map
   * @param {Map} cacheMap - The cache Map
   * @returns {string|null} - The oldest key or null if empty
   */
  findOldestEntry(cacheMap) {
    let oldestKey = null;
    let oldestTime = Infinity;
    
    for (const [key, item] of cacheMap.entries()) {
      if (item.created < oldestTime) {
        oldestTime = item.created;
        oldestKey = key;
      }
    }
    
    return oldestKey;
  }
  
  /**
   * Clean up expired items from all caches
   */
  cleanup() {
    const now = Date.now();
    
    for (const [cacheName, cache] of this.caches.entries()) {
      let expiredCount = 0;
      
      for (const [key, item] of cache.data.entries()) {
        if (item.expiry < now) {
          cache.data.delete(key);
          expiredCount++;
        }
      }
      
      if (expiredCount > 0) {
        console.log(`Cache cleanup: Removed ${expiredCount} expired items from ${cacheName}`);
      }
    }
  }
  
  /**
   * Get statistics for all caches
   * @returns {Object} - Statistics for all caches
   */
  getAllStats() {
    const stats = {};
    
    for (const [cacheName, cache] of this.caches.entries()) {
      stats[cacheName] = { 
        ...cache.stats,
        size: cache.data.size,
        maxSize: cache.maxSize
      };
    }
    
    return stats;
  }
  
  /**
   * Stop the cleanup interval
   */
  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export default CacheManager;