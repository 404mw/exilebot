export default {
  name: "dab",
  description: "Sends Habibi GIF",

  async execute(message) {
    try {
      await message.delete();
      await message.channel.send(
        `https://tenor.com/view/habibi-wildin-meme-funny-arab-gif-19979166`
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
