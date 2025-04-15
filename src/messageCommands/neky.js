export default {
  name: "neky",
  description: "Sends a random GIF",

  async execute(message) {
    const gifs = [
      "https://tenor.com/view/small-tiny-little-too-small-not-huge-gif-25307813",
      "https://tenor.com/view/south-park-so-small-gif-14287965",
      "https://tenor.com/view/magnifying-glass-cant-see-tiny-where-is-it-small-gif-23452184",
      "https://tenor.com/view/search-yes-okey-magnifying-glass-gif-10889149",
    ];
    try {
      // await message.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
      await message.channel.send(`https://tenor.com/view/tic-tac-toe-too-tiny-size-matters-too-small-gif-15230774`);
    } catch (error) {
      console.error("Failed to delete message or send GIF:", error);
    }
  },
};
