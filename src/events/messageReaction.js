// src/events/messageReaction.js
import { Events } from "discord.js";

export default {
  name: Events.MessageCreate,
  once: false,
  async execute(message, client) {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    const reacted = new Set();

    for (const [trigger, reaction] of client.reactions) {
      if (content.includes(trigger)) {
        const emoji = await reaction.execute(message, true);
        if (emoji && !reacted.has(emoji)) {
          await message.react(emoji);
          reacted.add(emoji);
        }
      }
    }
  }
};
