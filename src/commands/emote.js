import { SlashCommandBuilder, MessageFlags } from "discord.js";
import {
  emotePeepo,
  emoteCat,
  emotePanda,
  emoteOthers,
} from "../utils/emoteList.js";

export default {
  data: new SlashCommandBuilder()
    .setName(`emote`)
    .setDescription(`free nitro experience`)
    .addStringOption((option) =>
      option
        .setName(`group`)
        .setDescription(`Select a group of emoji to choose from`)
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
    const focusedValue = interaction.options.getFocused()?.toLowerCase();

    if (!focusedValue) return interaction.respond([]);

    const emoteGroups = {
      peepo: emotePeepo,
      panda: emotePanda,
      cat: emoteCat,
      others: emoteOthers,
      all: [...emotePeepo, ...emotePanda, ...emoteCat, ...emoteOthers],
    };

    const filtered = emoteGroups[groupName] || emoteGroups.all;

    const response = filtered
      .filter((emote) => emote.name.toLowerCase().includes(focusedValue))
      .slice(0, 25)
      .map(({ name }) => ({ name, value: name }));

    interaction.respond(response);
  },
};
