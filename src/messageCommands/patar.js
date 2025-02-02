module.exports = {
    name: "patar",
    aliases: ["patat", "xpatar", "xpatat"],
    description: "Sends a random patrick GIF",

    execute(message) {
        if (message.channel.id === "866773791560040519") {
            const patar = [
              "https://tenor.com/view/what-patrick-star-saving-bikini-bottom-the-sandy-cheeks-movie-what%27s-the-big-deal-gif-7543153473062287336",
              "https://tenor.com/view/patrick-star-in-love-heart-eyes-love-you-smile-gif-14881894487762636065",
              "https://tenor.com/view/spongebob-squarepants-cheer-number-one-patrick-star-gif-1178511842618206257",
              "https://tenor.com/view/lol-laughing-laugh-cracking-up-spongebob-gif-993144828522412536",
            ];
      
            const result = Math.floor(Math.random() * patar.length);
            return message.reply(patar[result]);
        } else return message.reply(`https://tenor.com/view/minions-potato-bananas-gif-19661796`);
    }
};
