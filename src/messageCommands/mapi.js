module.exports = {
    name: "mapi",
    aliases: ["mapus", "m4pi"],
    description: "Sends Mapi's own GIF",

    execute(message) {
        const mapi = './media/mapi.gif';
    return message.reply({ files: [mapi] });
    }
};
