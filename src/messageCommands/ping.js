export default {
  name: "ping",
  description: "Sends Pong and later edits the message with response time",

  async execute(message) {
    try {
      const sentTime = Date.now();
      const replyMessage = await message.reply("Pong! 🏓");

      const responseTime = Math.round((Date.now() - sentTime) / 100);
      await replyMessage.edit(`Pong! 🏓 \n**${responseTime}ms**`);
    } catch (error) {
      console.error("Error in ping command:", error);
    }
  },
};
