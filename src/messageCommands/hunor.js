module.exports = {
    name: "hunor",
    description: "Sends a Jim Carrey GIF",

    execute(message) {
        return message.reply( `https://tenor.com/view/jim-carrey-bye-liar-gif-27660461`);
    }
};
