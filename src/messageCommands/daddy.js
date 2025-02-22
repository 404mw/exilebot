export default {
  name: "daddy",
  aliases: ["shaggy"],
  description: "Sends a dope shaggy's GIF",

  async execute(message) {
    try {
      await message.channel.send(
        `https://tenor.com/view/blaze-it-shaggy-smoke-scooby-doo-gif-5354085`
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
