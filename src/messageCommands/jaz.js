export default {
  name: "jaz",
  description: "Sends an angry girls GIF",

  async execute(message) {
    try {
      await message.delete();
      await message.channel.send(
        `https://tenor.com/view/baby-girl-gif-19510561`
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
