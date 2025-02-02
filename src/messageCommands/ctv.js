module.exports = {
    name: "ctv",
    description: "Sends CTV's desired GIF",

    execute(message) {
        const ctv = `./media/ctv.gif`;
        message.reply({ files: [ctv] });
    }
};
