export default {
  name: "queen",
  description: "Sends a girl's GIF scared by a spider",

  async execute(message) {
    try {
      await message.channel.send(
        `https://tenor.com/view/spider-man-gif-21019143`
      );
    } catch (error) {
      console.error("Error deleting message or sending GIF:", error);
    }
  },
};
