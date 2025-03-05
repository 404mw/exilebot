export default {
  name: "se",
  description: "Directs the user to /se",

  async execute(message) {
    try {
      await message.delete();
      const reply = await message.channel.send(`\`/se\` to calculate`);
      setTimeout(() => {
        reply.delete();
      }, 3000);
    } catch (error) {
      console.error("Error deleting message or sending reply:", error);
    }
  },
};
