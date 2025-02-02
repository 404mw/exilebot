module.exports = {
    name: "adrian",
    aliases: ["skjold"],
    description: "Sends a random whale GIF",

    execute(message) {
        const adrian = [
            "https://tenor.com/view/unusual-whales-unusual-whales-eat-money-gif-22693447",
            "https://tenor.com/view/unusual-whales-unusual-whales-dive-gif-22693446",
            "https://tenor.com/view/unusual-whales-unusual-whales-rain-money-gif-23090764",
            "https://tenor.com/view/mckinley-whale-big-gif-3873017581534036627",
            "https://tenor.com/view/whale-whale-sharks-gif-26141126"
          ];
      
          const result = Math.floor(Math.random() * adrian.length);
          return message.reply(adrian[result]);
    }
};
