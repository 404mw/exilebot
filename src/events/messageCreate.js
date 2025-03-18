export default {
  name: "messageCreate",
  once: false,

  execute(message, client) {
    if (message.author.bot) return;

    if (message.mentions.has(client.user)) {
      message.react(`<:ping:1326194149808144425>`);
    } else if (
      message.content.toLowerCase().includes(`morgen`) ||
      message.content.toLowerCase().includes(`mornin`)
    ) {
      message.react(`<a:GM_Whale:1335633850923225098>`);
    } else if (message.content.startsWith("<:confused:1348039085239046215>")) {
      message.react(`<a:patpatat:1351641692515864677>`);
    } else if (message.content.startsWith("<:Pepo_Huh:1057393719386591372>")) {
      message.react(`<a:patpatat:1351641692515864677>`);
    }
  },
};
