export default {
  name: "messageCreate",
  once: false,

  execute(message, client) {
    if (message.author.bot) return;

    if (message.mentions.has(client.user)) {
      message.react(`<:ping:1326194149808144425>`);
    }
    
  },
};
