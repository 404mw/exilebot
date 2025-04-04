export default {
  triggers: ["chef", "pillow"],

  async execute(message, returnOnly = false) {
    const emoji = "<:ppchef:1357751794624757892>";
    if (returnOnly) return emoji;
    await message.react(emoji);
    return emoji;
  },
};
