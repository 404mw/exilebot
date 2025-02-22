export default {
  name: "wexon",
  description: "Sends a Solara GIF",

  async execute(message) {
    try {
      await message.channel.send(
        `https://tenor.com/view/solara-roblox-roblox-hacks-hacks-exploits-gif-3309607858158260586`
      );
    } catch (error) {
      console.error("Error deleting message or sending GIF:", error);
    }
  },
};
