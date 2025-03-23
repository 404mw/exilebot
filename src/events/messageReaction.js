import { Events } from "discord.js";

export default {
  name: Events.MessageCreate,
  once: false,
  async execute(message, client) {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    for (const [trigger, reaction] of client.reactions) {
      if (content.includes(trigger)) {
        await reaction.execute(message);
        break;
      }
    }
  }
};