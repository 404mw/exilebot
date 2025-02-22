export default {
  name: "adrian",
  aliases: ["skjold"],
  description: "Sends a random whale GIF",

  async execute(message) {
    const gifs = [
      "https://tenor.com/view/unusual-whales-unusual-whales-eat-money-gif-22693447",
      "https://tenor.com/view/unusual-whales-unusual-whales-dive-gif-22693446",
      "https://tenor.com/view/unusual-whales-unusual-whales-rain-money-gif-23090764",
      "https://tenor.com/view/mckinley-whale-big-gif-3873017581534036627",
      "https://tenor.com/view/whale-whale-sharks-gif-26141126",
    ];

    try {
      await message.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
    } catch (error) {
      console.error("Error deleting message or sending GIF:", error);
    }
  },
};
