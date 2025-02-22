export default {
  name: "tok",
  aliases: ["tokra", "tokora", "azrael"],
  description: "Sends a stewie's GIF sorrunded by strippers",

  async execute(message) {
    try {
      await message.channel.send(
        `https://tenor.com/view/family-guy-stewie-griffin-strippers-strip-girls-gif-4422950`
      );
    } catch (error) {
      console.error("Error deleting message or sending GIF:", error);
    }
  },
};
