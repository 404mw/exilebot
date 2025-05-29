import { handleEventError } from '../utils/errorHandler.js';

export default {
  name: "messageCreate",
  once: false,

  execute(message, client) {
    try {
      if (message.author.bot) return;

      // React with ping emoji when bot is mentioned
      if (message.mentions.has(client.user)) {
        message.react(client.config.emojis.ping);
      }
    } catch (error) {
      handleEventError(error, 'messageCreate', { 
        messageId: message.id,
        channelId: message.channel.id,
        authorId: message.author.id
      });
    }
  },
};
