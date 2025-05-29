/**
 * Lazy Command Loader Utility
 * Provides memory-efficient command loading by only loading commands when needed
 */

import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

class LazyCommandLoader {
  constructor(client, options = {}) {
    this.client = client;
    this.commandsDir = options.commandsDir || join(dirname(fileURLToPath(import.meta.url)), "../commands");
    this.messageCommandsDir = options.messageCommandsDir || join(dirname(fileURLToPath(import.meta.url)), "../messageCommands");
    
    // Maps to track loaded and pending commands
    this.loadedCommands = new Map();
    this.loadedMessageCommands = new Map();
    this.commandPaths = new Map();
    this.messageCommandPaths = new Map();
    this.aliases = new Map();
    
    // Statistics
    this.stats = {
      totalCommands: 0,
      loadedCommands: 0,
      totalMessageCommands: 0,
      loadedMessageCommands: 0
    };
  }

  /**
   * Initialize the command loader by scanning directories
   * but not loading the actual command implementations
   */
  async initialize() {
    try {
      // Scan slash commands directory
      const commandFiles = (await readdir(this.commandsDir)).filter(
        (file) => file.endsWith(".js") && file !== "index.js"
      );
      
      // Store paths for later lazy loading
      for (const file of commandFiles) {
        const commandName = file.replace(".js", "");
        this.commandPaths.set(commandName, join(this.commandsDir, file));
      }
      
      this.stats.totalCommands = this.commandPaths.size;
      
      // Scan message commands directory
      const messageCommandFiles = (await readdir(this.messageCommandsDir)).filter(
        (file) => file.endsWith(".js") && file !== "index.js"
      );
      
      // Store paths for later lazy loading
      for (const file of messageCommandFiles) {
        const commandName = file.replace(".js", "");
        this.messageCommandPaths.set(commandName, join(this.messageCommandsDir, file));
      }
      
      this.stats.totalMessageCommands = this.messageCommandPaths.size;
      
      console.log(`✅ Command scanner initialized: Found ${this.stats.totalCommands} slash commands and ${this.stats.totalMessageCommands} message commands`);
      
      return {
        slashCommandCount: this.stats.totalCommands,
        messageCommandCount: this.stats.totalMessageCommands
      };
    } catch (error) {
      console.error("❌ Failed to initialize command scanner:", error);
      throw error;
    }
  }

  /**
   * Lazy load a slash command when it's first requested
   * @param {string} commandName - Name of the command to load
   * @returns {Object|null} - The loaded command or null if not found
   */
  async getCommand(commandName) {
    // Return from cache if already loaded
    if (this.loadedCommands.has(commandName)) {
      return this.loadedCommands.get(commandName);
    }
    
    // Check if we have a path for this command
    if (!this.commandPaths.has(commandName)) {
      return null;
    }
    
    try {
      // Load the command dynamically
      const filePath = pathToFileURL(this.commandPaths.get(commandName)).href;
      const { default: command } = await import(filePath);
      
      if (!command || !command.data || !command.execute) {
        console.warn(`⚠️ Warning: ${commandName} is missing "data" or "execute"!`);
        return null;
      }
      
      // Cache the loaded command
      this.loadedCommands.set(commandName, command);
      this.stats.loadedCommands++;
      
      console.log(`🔄 Lazy loaded command: ${commandName}`);
      return command;
    } catch (error) {
      console.error(`❌ Failed to lazy load command ${commandName}:`, error);
      return null;
    }
  }

  /**
   * Lazy load a message command when it's first requested
   * @param {string} commandName - Name of the command to load
   * @returns {Object|null} - The loaded command or null if not found
   */
  async getMessageCommand(commandName) {
    // Check if it's an alias
    if (this.aliases.has(commandName)) {
      const actualName = this.aliases.get(commandName);
      return this.getMessageCommand(actualName);
    }
    
    // Return from cache if already loaded
    if (this.loadedMessageCommands.has(commandName)) {
      return this.loadedMessageCommands.get(commandName);
    }
    
    // Check if we have a path for this command
    if (!this.messageCommandPaths.has(commandName)) {
      return null;
    }
    
    try {
      // Load the command dynamically
      const filePath = pathToFileURL(this.messageCommandPaths.get(commandName)).href;
      const { default: command } = await import(filePath);
      
      if (!command || !command.name || !command.execute) {
        console.warn(`⚠️ Warning: ${commandName} is missing "name" or "execute"!`);
        return null;
      }
      
      // Cache the loaded command
      this.loadedMessageCommands.set(command.name, command);
      this.stats.loadedMessageCommands++;
      
      // Register aliases
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach(alias => this.aliases.set(alias, command.name));
      }
      
      console.log(`🔄 Lazy loaded message command: ${commandName}`);
      return command;
    } catch (error) {
      console.error(`❌ Failed to lazy load message command ${commandName}:`, error);
      return null;
    }
  }

  /**
   * Preload frequently used commands to avoid lazy loading delays
   * @param {Array} commandNames - Array of command names to preload
   * @param {Array} messageCommandNames - Array of message command names to preload
   */
  async preloadCommands(commandNames = [], messageCommandNames = []) {
    const preloadPromises = [];
    
    // Preload slash commands
    for (const name of commandNames) {
      if (!this.loadedCommands.has(name) && this.commandPaths.has(name)) {
        preloadPromises.push(this.getCommand(name));
      }
    }
    
    // Preload message commands
    for (const name of messageCommandNames) {
      if (!this.loadedMessageCommands.has(name) && this.messageCommandPaths.has(name)) {
        preloadPromises.push(this.getMessageCommand(name));
      }
    }
    
    await Promise.all(preloadPromises);
    console.log(`✅ Preloaded ${preloadPromises.length} commands`);
  }

  /**
   * Get statistics about command loading
   * @returns {Object} - Command loading statistics
   */
  getStats() {
    return {
      ...this.stats,
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
      loadedCommandsPercentage: (this.stats.loadedCommands / Math.max(1, this.stats.totalCommands)) * 100,
      loadedMessageCommandsPercentage: (this.stats.loadedMessageCommands / Math.max(1, this.stats.totalMessageCommands)) * 100
    };
  }
}

export default LazyCommandLoader;