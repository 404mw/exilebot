export default {
  name: "lfa",
  aliases: ["lofa", "aspen"],
  description: "Sends LFA's GIF ('i dont like you' by CTV)",

  async execute(message) {
    const gif = `./media/ctv2.gif`;
    try {
      await message.channel.send({ files: [gif] });
    } catch (error) {
      console.error("Failed to send GIF:", error);
    }
  },
};
