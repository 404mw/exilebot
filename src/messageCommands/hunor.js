export default {
  name: "hunor",
  description: "Sends a Jim Carrey GIF",

  async execute(message) {
    try {
      await message.delete();
      await message.channel.send(
        `https://tenor.com/view/jim-carrey-bye-liar-gif-27660461`
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
