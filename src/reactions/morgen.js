export default {
  triggers: ["morgen", "morning", "morns", "orgen", "orning"],

  async execute(message, returnOnly = false) {
    const emoji = "<a:GM_Whale:1335633850923225098>";
    if (returnOnly) return emoji;
    await message.react(emoji);
    return emoji;
  },
};
