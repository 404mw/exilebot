export default {
  name: "patar",
  aliases: ["patat", "xpatar", "xpatat", "patatar"],
  description: "Sends a random patrick GIF",

  async execute(message) {
    const gifs = [
      "https://tenor.com/view/what-patrick-star-saving-bikini-bottom-the-sandy-cheeks-movie-what%27s-the-big-deal-gif-7543153473062287336",
      "https://tenor.com/view/patrick-star-in-love-heart-eyes-love-you-smile-gif-14881894487762636065",
      "https://tenor.com/view/spongebob-squarepants-cheer-number-one-patrick-star-gif-1178511842618206257",
      "https://tenor.com/view/lol-laughing-laugh-cracking-up-spongebob-gif-993144828522412536",
    ];
    try {
      await message.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
    } catch (error) {
      console.error("Error deleting message or sending GIF:", error);
    }
  },
};
