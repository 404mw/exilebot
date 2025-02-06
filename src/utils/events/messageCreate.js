module.exports = {
    name: "messageCreate",
    once: false,

    execute(message, client) {
        if (message.author.bot) return;

        if (message.mentions.has(client.user)) {
            message.react(`<:ping:1326194149808144425>`);
        } else if (message.content.toLowerCase().includes(`morgen`)) {
            message.react(`<a:GM_Whale:1335633850923225098>`);
        }
    },
};
