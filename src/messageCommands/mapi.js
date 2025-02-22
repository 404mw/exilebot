export default {
  name: "mapi",
  aliases: ["mapus", "m4pi"],
  description: "Sends Mapi's own GIF",

  async execute(message) {
    const gif = `./media/mapi.gif`;
    try {
      await message.channel.send({ files: [gif] });
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
