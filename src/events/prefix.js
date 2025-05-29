import { handleEventError, handleCommandError } from '../utils/errorHandler.js';

export default {
  name: "messageCreate",
  once: false,

  async execute(message, client) {
    try {
      if (message.author.bot) return;

      const prefix = client.config.prefix;
      if (!message.content.startsWith(prefix)) return;

      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      
      // Get command from lazy loader if available, otherwise fall back to the commands map
      let command;
      if (client.commandLoader) {
        command = await client.commandLoader.getMessageCommand(commandName);
      } else {
        command = client.messageCommands.get(commandName) ||
                 client.messageCommands.get(client.aliases.get(commandName));
      }
      
      if (!command) return;

      // Track command usage for memory optimization
      if (client.commandCooldowns) {
        const usageKey = `${message.author.id}:${command.name}`;
        client.commandCooldowns.set(usageKey, Date.now());
      }

      // Execute the command
      try {
        await command.execute(message, args);
      } catch (error) {
        // Log the command error with context
        handleCommandError(error, message, command.name);
        message.reply("There was an error while executing this command!");
      }
    } catch (error) {
      // Log any errors in the event handler itself
      handleEventError(error, 'prefix', { 
        messageId: message.id,
        channelId: message.channel.id,
        authorId: message.author.id,
        content: message.content
      });
    }
  },
};
