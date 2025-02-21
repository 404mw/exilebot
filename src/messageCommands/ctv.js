export default {
  name: "ctv",
  description: "Sends CTV's desired GIF",

  async execute(message) {
    const ctv = `./media/ctv.gif`;
    try {
      await message.delete();
      await message.channel.send({ files: [ctv] });
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
