export default {
  name: "mw",
  aliases: ["mwpi", "m.w", "m.w."],
  description: "Sends a GIF",

  async execute(message) {
    const gifs = {
      target:
        "https://tenor.com/view/cheeky-monkey-cheeky-baby-christmas-tree-baby-gif-24266151",
      default:
        "https://tenor.com/view/the-office-michael-scott-steve-carell-im-interested-im-listening-gif-1391849278728099340",
    };

    const gifToSend =
      message.author.username === "m.w." ? gifs.target : gifs.default;

    try {
      await message.channel.send(gifToSend);
    } catch (error) {
      console.error("Error sending GIF:", error);
    }
  },
};
