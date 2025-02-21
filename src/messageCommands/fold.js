export default {
  name: "fold",
  aliases: ["flip", "samsung"],
  description: "Sends a random Samsung fold GIF",

  async execute(message) {
    const gifs = [
      "https://tenor.com/view/samsung-samsung-galaxy-samsung-galaxy-z-samsung-galaxy-z-fold-samsung-galaxy-z-fold-6-gif-17233388516951825573",
      "https://tenor.com/view/samsung-samsung-galaxy-samsung-galaxy-z-samsung-galaxy-z-fold-samsung-galaxy-z-fold-5-gif-8796314290296609501",
      "https://tenor.com/view/samsung-samsung-galaxy-samsung-galaxy-z-samsung-galaxy-z-fold-samsung-galaxy-z-fold3-gif-22713805",
      "https://tenor.com/view/samsung-samsung-galaxy-samsung-galaxy-z-samsung-galaxy-z-fold-samsung-galaxy-z-fold-6-gif-16899636265295383040",
      "https://tenor.com/view/samsung-samsung-galaxy-samsung-galaxy-z-samsung-galaxy-z-fold-samsung-galaxy-z-fold4-gif-26471633",
    ];
    try {
      await message.delete();
      await message.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
