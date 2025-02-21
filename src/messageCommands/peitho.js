export default {
  name: "peitho",
  description: "Sends Why so weak GIF",

  async execute(message) {
    try {
      await message.delete();
      await message.channel.send(
        "https://tenor.com/view/uncle-roger-weak-gif-19541923"
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
