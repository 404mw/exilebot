export default {
  name: "wick",
  aliases: ["poe", "poe2"],
  description: "Sends a PoE GIF",

  async execute(message) {
    try {
      await message.delete();
      await message.channel.send(
        `https://tenor.com/view/play-poe-2-the-best-game-arpg-poe-like-true-diablo-path-of-exile-2-gif-16648459918324750033`
      );
    } catch (error) {
      console.error("Error deleting message or sending GIF:", error);
    }
  },
};
