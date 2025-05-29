/**
 * Discord.js Cache Optimizer
 * Provides optimized caching strategies for Discord.js client
 */

class DiscordCacheOptimizer {
  /**
   * Create a new Discord.js cache optimizer
   * @param {Client} client - Discord.js client instance
   * @param {Object} options - Configuration options
   */
  constructor(client, options = {}) {
    this.client = client;
    this.options = {
      // Default sweep intervals (in milliseconds)
      messageLifetime: options.messageLifetime || 1800000, // 30 minutes
      userLifetime: options.userLifetime || 3600000, // 1 hour
      guildMemberLifetime: options.guildMemberLifetime || 3600000, // 1 hour
      threadLifetime: options.threadLifetime || 3600000, // 1 hour
      
      // Sweep intervals
      sweepInterval: options.sweepInterval || 900000, // 15 minutes
      
      // Cache limits
      messageCacheMaxSize: options.messageCacheMaxSize || 100,
      messageCacheLifetime: options.messageCacheLifetime || 1800, // 30 minutes in seconds
      messageSweepInterval: options.messageSweepInterval || 300, // 5 minutes in seconds
      
      // Whether to enable automatic sweeping
      enableSweeping: options.enableSweeping !== undefined ? options.enableSweeping : true,
      
      // Whether to log sweep operations
      logSweeps: options.logSweeps !== undefined ? options.logSweeps : true
    };
    
    this.sweepIntervalId = null;
    this.stats = {
      messagesSwept: 0,
      usersSwept: 0,
      guildMembersSwept: 0,
      threadsSwept: 0,
      lastSweep: null
    };
  }

  /**
   * Apply optimized cache settings to the Discord.js client
   */
  applyOptimizedCacheSettings() {
    // Set message cache options
    this.client.options.messageCacheMaxSize = this.options.messageCacheMaxSize;
    this.client.options.messageCacheLifetime = this.options.messageCacheLifetime;
    this.client.options.messageSweepInterval = this.options.messageSweepInterval;
    
    // Start automatic sweeping if enabled
    if (this.options.enableSweeping) {
      this.startSweepInterval();
    }
    
    if (this.options.logSweeps) {
      console.log('✅ Applied optimized cache settings to Discord.js client');
    }
  }

  /**
   * Start the automatic cache sweeping interval
   */
  startSweepInterval() {
    if (this.sweepIntervalId) {
      clearInterval(this.sweepIntervalId);
    }
    
    this.sweepIntervalId = setInterval(() => {
      this.sweepCaches();
    }, this.options.sweepInterval);
    
    if (this.options.logSweeps) {
      console.log(`🧹 Started automatic cache sweeping (interval: ${this.options.sweepInterval / 1000}s)`);
    }
  }

  /**
   * Stop the automatic cache sweeping interval
   */
  stopSweepInterval() {
    if (this.sweepIntervalId) {
      clearInterval(this.sweepIntervalId);
      this.sweepIntervalId = null;
      
      if (this.options.logSweeps) {
        console.log('🛑 Stopped automatic cache sweeping');
      }
    }
  }

  /**
   * Manually sweep all caches
   * @returns {Object} - Statistics about the sweep operation
   */
  sweepCaches() {
    const now = Date.now();
    let messagesSwept = 0;
    let usersSwept = 0;
    let guildMembersSwept = 0;
    let threadsSwept = 0;
    
    // Sweep messages
    if (this.client.options.messageCacheMaxSize > 0) {
      this.client.channels.cache.forEach(channel => {
        if (channel.messages && typeof channel.messages.sweep === 'function') {
          const swept = channel.messages.sweep(message => {
            return now - message.createdTimestamp > this.options.messageLifetime;
          });
          messagesSwept += swept;
        }
      });
    }
    
    // Sweep users that aren't in any guilds
    if (this.client.users.cache.size > 0) {
      const usersInGuilds = new Set();
      
      // Collect all users that are in guilds
      this.client.guilds.cache.forEach(guild => {
        guild.members.cache.forEach(member => {
          usersInGuilds.add(member.user.id);
        });
      });
      
      // Sweep users that aren't in any guilds and haven't been seen recently
      const swept = this.client.users.cache.sweep(user => {
        // Keep users that are in guilds
        if (usersInGuilds.has(user.id)) return false;
        
        // Keep users that have been seen recently
        const lastSeen = user.lastMessageTimestamp || user.createdTimestamp;
        return now - lastSeen > this.options.userLifetime;
      });
      
      usersSwept = swept;
    }
    
    // Sweep guild members
    this.client.guilds.cache.forEach(guild => {
      if (guild.members && typeof guild.members.sweep === 'function') {
        const swept = guild.members.sweep(member => {
          // Don't sweep the bot itself
          if (member.id === this.client.user.id) return false;
          
          // Don't sweep guild owner
          if (member.id === guild.ownerId) return false;
          
          // Keep members that have been seen recently
          const lastSeen = member.lastMessageTimestamp || member.joinedTimestamp;
          return lastSeen && (now - lastSeen > this.options.guildMemberLifetime);
        });
        
        guildMembersSwept += swept;
      }
    });
    
    // Sweep threads
    this.client.channels.cache.forEach(channel => {
      if (channel.threads && typeof channel.threads.cache.sweep === 'function') {
        const swept = channel.threads.cache.sweep(thread => {
          // Keep active threads
          if (!thread.archived) return false;
          
          // Keep threads that have been active recently
          return now - thread.archiveTimestamp > this.options.threadLifetime;
        });
        
        threadsSwept += swept;
      }
    });
    
    // Update stats
    this.stats.messagesSwept += messagesSwept;
    this.stats.usersSwept += usersSwept;
    this.stats.guildMembersSwept += guildMembersSwept;
    this.stats.threadsSwept += threadsSwept;
    this.stats.lastSweep = now;
    
    if (this.options.logSweeps) {
      console.log(`🧹 Cache sweep completed: ${messagesSwept} messages, ${usersSwept} users, ${guildMembersSwept} members, ${threadsSwept} threads`);
    }
    
    return {
      messagesSwept,
      usersSwept,
      guildMembersSwept,
      threadsSwept,
      timestamp: now
    };
  }

  /**
   * Get current cache statistics
   * @returns {Object} - Current cache statistics
   */
  getCacheStats() {
    return {
      // Cache sizes
      users: this.client.users.cache.size,
      guilds: this.client.guilds.cache.size,
      channels: this.client.channels.cache.size,
      emojis: this.client.emojis?.cache.size || 0,
      messages: this.getMessageCount(),
      guildMembers: this.getGuildMemberCount(),
      
      // Sweep stats
      sweepStats: { ...this.stats },
      
      // Memory usage
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024 // MB
    };
  }

  /**
   * Get the total number of cached messages across all channels
   * @returns {number} - Total number of cached messages
   */
  getMessageCount() {
    let count = 0;
    this.client.channels.cache.forEach(channel => {
      if (channel.messages && channel.messages.cache) {
        count += channel.messages.cache.size;
      }
    });
    return count;
  }

  /**
   * Get the total number of cached guild members across all guilds
   * @returns {number} - Total number of cached guild members
   */
  getGuildMemberCount() {
    let count = 0;
    this.client.guilds.cache.forEach(guild => {
      if (guild.members && guild.members.cache) {
        count += guild.members.cache.size;
      }
    });
    return count;
  }

  /**
   * Clean up resources when no longer needed
   */
  destroy() {
    this.stopSweepInterval();
  }
}

export default DiscordCacheOptimizer;