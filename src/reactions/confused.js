export default {
  triggers: [
    "<:confused:1348039085239046215>",
    "<:Pepo_Huh:1057393719386591372>",
  ],

  async execute(message, returnOnly = false) {
    const emoji = "<a:patpatat:1351641692515864677>";
    if (returnOnly) return emoji;
    await message.react(emoji);
    return emoji;
  },
};
