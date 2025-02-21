export default {
  name: "classic",
  description: "Sends a Best Cat Mom GIF",

  async execute(message) {
    try {
      await message.delete();
      await message.channel.send(
        `https://tenor.com/view/crazy-cat-lady-agnes-loonstra-illustration-cat-cat-mom-gif-13715924`
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
