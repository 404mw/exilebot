export default {
  name: "ctv",
  description: "Sends CTV's desired GIF",

  async execute(message) {
    const ctv = [
      `./media/ctv.gif`,
      `./media/ctv2.gif`
    ];

    const gif = ctv[Math.floor(Math.random() * ctv.length)];

    try {
      await message.channel.send({ files: [gif] });
    } catch (error) {
      console.error("Failed to send GIF:", error);
    }
  },
};
