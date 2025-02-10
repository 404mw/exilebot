const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { emotePeepo, emoteCat, emotePanda, emoteOthers} = require("../utils/emoteList.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`emote`)
    .setDescription(`free nitro experience`)
    .addStringOption((option) =>
      option
        .setName(`group`)
        .setDescription(`Select a group of emoji to choose from`)
        .setRequired(true)
        .addChoices(
          { name: `Peepos`, value: `peepo` },
          { name: `Pandas`, value: `panda` },
          { name: `Cats`, value: `cat` },
          { name: `Others`, value: `others` }
        )
    )
    .addStringOption((option) =>
      option
        .setName(`name`)
        .setDescription(`Emoji name here`)
        .setAutocomplete(true)
        .setRequired(true)
    ),

  async execute(interaction) {
    const emotName = interaction.options.getString("name");
    const emoteList = [
      ...emotePeepo,
      ...emoteCat,
      ...emotePanda,
      ...emoteOthers,
    ];
    const emote = emoteList.find((e) => e.name === emotName);

    if (emote) {
      interaction.reply(emote.emote);
    } else {
      interaction.reply({
        content: `No emoji found for **${emotName}**`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },

  async autocomplete(interaction) {
    const groupName = interaction.options.getString("group");
    const focusedValue = interaction.options.getFocused();

    let filtered;
    if (groupName === `peepo`) {
      filtered = emotePeepo
    } else if (groupName === `panda`) {
      filtered = emotePanda
    } else if (groupName === `cat`) {
      filtered = emoteCat
    } else if (groupName === `others`) {
      filtered = emoteOthers
    }
    const response = filtered.filter((emote) =>
      emote.name.toLowerCase().includes(focusedValue.toLowerCase())
    )
    .slice(0, 25)
    .map((emote) => ({ name: emote.name, value: emote.name }));
    interaction.respond(response);
  },
};