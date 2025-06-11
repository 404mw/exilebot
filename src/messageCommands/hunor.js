export default {
  name: "hunor",
  description: "Sends a Jim Carrey GIF",

  async execute(message) {
    try {
      await message.channel.send(
        `https://tenor.com/view/liar-liar-jim-carrey-fletcher-reede-blabber-foolish-gif-5228584`
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
