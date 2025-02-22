export default {
  name: "komgen",
  aliases: ["kongen", "kogmen"],
  description: "Sends a Kim Jong Un GIF",

  async execute(message) {
    try {
      return message.channel.send(
        "https://tenor.com/view/kim-jong-un-gif-6119244402377892028"
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
