/**
 * Error Handler Utility
 * Provides centralized error handling for the bot
 */

/**
 * Log an error with context information
 * @param {Error} error - The error object
 * @param {string} context - Where the error occurred (e.g., 'Command: help', 'Event: messageCreate')
 * @param {Object} [additionalInfo={}] - Any additional information to log
 */
export function logError(error, context, additionalInfo = {}) {
  console.error(`\n❌ ERROR IN: ${context}`);
  console.error(`Message: ${error.message}`);
  console.error(`Stack: ${error.stack}`);
  
  if (Object.keys(additionalInfo).length > 0) {
    console.error('Additional Information:');
    for (const [key, value] of Object.entries(additionalInfo)) {
      console.error(`  ${key}: ${JSON.stringify(value)}`);
    }
  }
  
  console.error(''); // Empty line for readability
}

/**
 * Handle command errors and respond to the user
 * @param {Error} error - The error object
 * @param {Object} interaction - Discord.js interaction object
 * @param {string} commandName - Name of the command that failed
 */
export async function handleCommandError(error, interaction, commandName) {
  // Log the error with context
  logError(error, `Command: ${commandName}`, {
    user: interaction.user.tag,
    userId: interaction.user.id,
    guild: interaction.guild?.name || 'DM',
    guildId: interaction.guild?.id || 'DM',
    channel: interaction.channel?.name || 'Unknown',
    channelId: interaction.channel?.id || 'Unknown'
  });
  
  // Respond to the user if possible
  try {
    const errorMessage = 'There was an error while executing this command!';
    
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({ content: errorMessage });
    } else {
      await interaction.reply({ content: errorMessage, ephemeral: true });
    }
  } catch (replyError) {
    // If responding to the user fails, log that error too
    logError(replyError, `Failed to reply to command error for ${commandName}`);
  }
}

/**
 * Handle event errors
 * @param {Error} error - The error object
 * @param {string} eventName - Name of the event that failed
 * @param {Object} [additionalInfo={}] - Any additional information to log
 */
export function handleEventError(error, eventName, additionalInfo = {}) {
  logError(error, `Event: ${eventName}`, additionalInfo);
}

/**
 * Global unhandled error handlers
 * @param {Object} client - Discord.js client
 */
export function setupGlobalErrorHandlers(client) {
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (error) => {
    logError(error, 'Unhandled Promise Rejection');
  });
  
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    logError(error, 'Uncaught Exception');
    // In production, you might want to restart the bot here
  });
  
  // Handle Discord.js specific errors
  client.on('error', (error) => {
    logError(error, 'Discord.js Client Error');
  });
  
  client.on('shardError', (error, shardId) => {
    logError(error, `Discord.js Shard Error (Shard ${shardId})`);
  });
}