export default {
  name: "blank",
  description: "Sends a blank message",

  async execute(message) {
    try {
      await message.delete();
      await message.channel.send(
        `<:blank:1326590365062660187> \n <:blank:1326590365062660187> \n <:blank:1326590365062660187> \n <:blank:1326590365062660187> \n <:blank:1326590365062660187>`
      );
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
