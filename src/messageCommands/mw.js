module.exports = {
    name: "mw",
    aliases: ["mwpi"],
    description: "Sends a GIF",

    execute(message) {
        if (message.author.username === `m.w.`) {
            return message.reply(`https://tenor.com/view/cheeky-monkey-cheeky-baby-christmas-tree-baby-gif-24266151`)
        } else return message.reply(`https://tenor.com/view/the-office-michael-scott-steve-carell-im-interested-im-listening-gif-1391849278728099340`);
    }
};
