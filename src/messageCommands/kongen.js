module.exports = {
    name: "komgen",
    aliases: ["kongen"],
    description: "Sends a Kim Jong Un GIF",

    execute(message) {
        return message.reply("https://tenor.com/view/kim-jong-un-gif-6119244402377892028");
    }
};
