export default {
  name: "ctv",
  description: "Sends CTV's desired GIF",

  async execute(message) {
    const gif = `./media/ctv.gif`;
    try {
      await message.channel.send({ files: [gif] });
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
