# ExileBot Memory and Resource Optimization Guide

## Implemented Optimizations

The following memory and resource optimizations have been implemented in ExileBot:

### 1. Caching System

- **CacheManager (`src/utils/cacheManager.js`)**: A centralized caching utility that provides:
  - Time-based expiration (TTL)
  - Size-limited caches
  - Automatic cleanup of expired items
  - Cache statistics tracking
  - Multiple named caches with different configurations

### 2. Lazy Command Loading

- **LazyCommandLoader (`src/utils/lazyCommandLoader.js`)**: Reduces initial memory usage by:
  - Only scanning command files at startup without loading their implementations
  - Loading command code only when the command is first used
  - Preloading only essential, frequently used commands
  - Tracking command usage statistics

### 3. Discord.js Cache Optimization

- **DiscordCacheOptimizer (`src/utils/discordCacheOptimizer.js`)**: Optimizes Discord.js caching by:
  - Implementing custom sweeping strategies for messages, users, guild members, and threads
  - Configuring optimal cache lifetimes
  - Providing cache statistics
  - Automatically cleaning up unused cache entries

### 4. Memory Usage Monitoring

- Added memory usage monitoring to track heap and RSS usage
- Optional garbage collection triggering when memory usage exceeds thresholds
- Graceful shutdown to clean up resources

## Usage

### Caching Data

To cache data in your commands or events:

```javascript
// Get or create a named cache
const myCache = interaction.client.cacheManager.getCache('myCustomCache', {
  ttl: 60000, // 1 minute TTL
  maxSize: 50  // Maximum 50 items
});

// Store data
myCache.set('key', value);

// Retrieve data
const cachedValue = myCache.get('key');

// Check if key exists
if (myCache.has('key')) {
  // Key exists and is not expired
}
```

### Command Cooldowns

The bot now has a centralized cooldown system:

```javascript
// In a command file
const userCooldowns = interaction.client.userCooldowns;
const userId = interaction.user.id;
const commandName = 'myCommand';
const cooldownTime = 5000; // 5 seconds

// Check if user is on cooldown
const cooldownKey = `${userId}:${commandName}`;
if (userCooldowns.has(cooldownKey)) {
  const remainingTime = /* calculate remaining time */;
  return interaction.reply(`Please wait ${remainingTime} seconds before using this command again.`);
}

// Set cooldown
userCooldowns.set(cooldownKey, Date.now(), cooldownTime);
```

## Additional Optimization Recommendations

### 1. Command-Specific Optimizations

- **Resource-Intensive Commands**: For commands like `awaken.js` that perform calculations:
  - Cache calculation results when possible
  - Use more efficient algorithms
  - Consider limiting the maximum number of iterations

### 2. Event Handler Optimizations

- **Event Debouncing**: For high-frequency events, implement debouncing to prevent excessive processing
- **Conditional Event Registration**: Only register events that are needed based on configuration

### 3. Database and External API Optimizations

- **Connection Pooling**: If using databases, implement connection pooling
- **API Rate Limiting**: Implement proper rate limiting for external API calls
- **Response Caching**: Cache responses from external APIs

### 4. Advanced Techniques

- **Worker Threads**: For CPU-intensive tasks, consider using Node.js worker threads
- **Microservices**: For very large bots, consider splitting functionality into microservices
- **Sharding**: If the bot is in many servers, implement Discord.js sharding

## Monitoring and Maintenance

### Memory Usage Monitoring

The bot now logs memory usage every 5 minutes. Watch for:

- **Steady Increases**: May indicate memory leaks
- **Spikes**: May indicate inefficient command implementations

### Cache Statistics

To view cache statistics:

```javascript
// In a command or event
const stats = interaction.client.cacheManager.getAllStats();
console.log(stats);
```

### Garbage Collection

To enable manual garbage collection, start the bot with:

```bash
node --expose-gc index.js
```

## Future Improvements

- **TypeScript Migration**: Convert the codebase to TypeScript for better type safety
- **Unit Tests**: Add tests for the optimization utilities
- **Metrics Dashboard**: Implement a web dashboard for monitoring bot performance
- **Command Analytics**: Track command usage patterns to optimize further

## Troubleshooting

### High Memory Usage

If the bot is using too much memory:

1. Check which commands are being used most frequently
2. Review the cache statistics to see if any caches are growing too large
3. Adjust TTL and max size settings for caches
4. Consider implementing more aggressive sweeping strategies

### Slow Command Response

If commands are responding slowly:

1. Check if the command is doing too much work synchronously
2. Consider using async/await for I/O operations
3. Implement caching for expensive operations
4. Profile the command execution to identify bottlenecks