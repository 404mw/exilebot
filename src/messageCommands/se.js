import{ MessageFlags } from "discord.js";

export default {
  name: "se",
  description: "Directs the user to /se",

  async execute(message) {
    try {
      await message.delete();
      await message.channel.send({
        content: `This command has switched to \`/se\``,
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error("Error deleting message or sending GIF:", error);
    }
  },
};
