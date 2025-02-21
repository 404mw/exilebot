export default {
  name: "james",
  description: "Sends a Racists(Racer) GIF",

  async execute(message) {
    try {
      await message.delete();
      await message.channel.send(
        `https://tenor.com/view/racist-point-smile-gif-16693098`
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
