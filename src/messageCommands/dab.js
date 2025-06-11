export default {
  name: "dab",
  description: "Sends Habibi GIF",

  async execute(message) {
    try {
      await message.channel.send(
        `https://tenor.com/view/chancla-training-arab-slipper-throw-gif-17332920`
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
