export default {
  name: "mapi",
  aliases: ["mapus", "m4pi"],
  description: "Sends Mapi's own GIF",

  async execute(message) {
    const mapi = "./media/mapi.gif";
    try {
      await message.delete();
      await message.message.send({ files: [mapi] });
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
