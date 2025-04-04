export default {
  triggers: ["fren", "friend"],

  async execute(message, returnOnly = false) {
    const emoji = "<:gopnik:1325482731551068170>";
    if (returnOnly) return emoji;
    await message.react(emoji);
    return emoji;
  },
};
