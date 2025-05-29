import { Client, GatewayIntentBits, Collection } from "discord.js";
import loadCommands from "./src/commands/index.js";
import loadMessageCommands from "./src/messageCommands/index.js";
import loadEvents from "./src/utils/eventHandler.js";
import validateEnv from "./src/utils/validateEnv.js";
import { setupGlobalErrorHandlers } from "./src/utils/errorHandler.js";
import config from "./src/utils/config.js";
import CacheManager from "./src/utils/cacheManager.js";
import LazyCommandLoader from "./src/utils/lazyCommandLoader.js";
import DiscordCacheOptimizer from "./src/utils/discordCacheOptimizer.js";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Validate environment variables
validateEnv();

// Create Discord.js client with optimized options
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  // Optimize caching defaults
  messageCacheMaxSize: 50,         // Reduced from default
  messageCacheLifetime: 600,       // 10 minutes (in seconds)
  messageSweepInterval: 300,       // 5 minutes (in seconds)
  makeCache: Options => new Collection(Options.sweepFilter ? { sweepFilter: Options.sweepFilter } : null),
});

// Initialize collections
client.commands = new Map();
client.messageCommands = new Map();
client.aliases = new Map();
client.reactions = new Map();

// Initialize cache manager
client.cacheManager = new CacheManager({
  defaultTTL: 300000,  // 5 minutes
  maxSize: 100,        // Max 100 entries per cache
  cleanupInterval: 60000 // 1 minute cleanup
});

// Create command-specific caches
client.commandCooldowns = client.cacheManager.getCache('commandCooldowns', { ttl: 60000 }); // 1 minute
client.userCooldowns = client.cacheManager.getCache('userCooldowns', { ttl: 300000 }); // 5 minutes

// Make config available throughout the application
client.config = config;

// Setup global error handlers
setupGlobalErrorHandlers(client);

// Initialize Discord.js cache optimizer
const cacheOptimizer = new DiscordCacheOptimizer(client, {
  messageLifetime: 1800000,     // 30 minutes
  userLifetime: 3600000,        // 1 hour
  guildMemberLifetime: 3600000, // 1 hour
  sweepInterval: 900000,        // 15 minutes
  logSweeps: true
});

// Apply optimized cache settings
cacheOptimizer.applyOptimizedCacheSettings();

// Initialize lazy command loader
const commandLoader = new LazyCommandLoader(client);

// Load all commands and events
try {
  console.log('Initializing command scanner...');
  await commandLoader.initialize();
  
  // Preload essential commands
  await commandLoader.preloadCommands(
    ['help', 'ping'], // Slash commands to preload
    ['ping']           // Message commands to preload
  );
  
  console.log('Loading events...');
  await loadEvents(client);
  
  // Make command loader available to event handlers
  client.commandLoader = commandLoader;
  
  console.log('✅ All commands and events initialized successfully!');
} catch (error) {
  console.error('❌ Error initializing commands or events:', error);
  process.exit(1);
}

// Add memory usage monitoring
const memoryMonitorInterval = setInterval(() => {
  const memoryUsage = process.memoryUsage();
  const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100;
  const rssUsedMB = Math.round(memoryUsage.rss / 1024 / 1024 * 100) / 100;
  
  console.log(`Memory usage - Heap: ${heapUsedMB} MB, RSS: ${rssUsedMB} MB`);
  
  // Force garbage collection if available and memory usage is high
  if (global.gc && heapUsedMB > 150) {
    console.log('🧹 Forcing garbage collection...');
    global.gc();
  }
}, 300000); // Log every 5 minutes

// Login to Discord
const token = process.env.TOKEN;
client.login(token)
  .then(() => {
    console.log(`✅ Bot logged in as ${client.user.tag}!`);
  })
  .catch(error => {
    console.error('❌ Failed to login to Discord:', error);
    process.exit(1);
  });

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down...');
  clearInterval(memoryMonitorInterval);
  cacheOptimizer.destroy();
  client.cacheManager.destroy();
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down...');
  clearInterval(memoryMonitorInterval);
  cacheOptimizer.destroy();
  client.cacheManager.destroy();
  client.destroy();
  process.exit(0);
});