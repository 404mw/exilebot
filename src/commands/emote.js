const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const emoteList = require("../utils/emoteList.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`emote`)
    .setDescription(`free nitro experience`)
    .addStringOption(option => 
      option
        .setName(`name`)
        .setDescription(`Emoji name here`)
        .setAutocomplete(true)
        .setRequired(true)
    ),

    async execute(interaction) {

      const emotname = interaction.options.getString("name");
      const emote = emoteList.find((e) => e.name === emotname);

      if (emote) {
        interaction.reply(emote.emote);
      } else {
        interaction.reply({
          content: `No emoji found for **${emotname}**`,
          flags: MessageFlags.Ephemeral,
        });
      }
    },

    async autocomplete(interaction) {
      const focusedValue = interaction.options.getFocused();
      
      const filtered = emoteList
        .filter(emote => emote.name.toLowerCase().includes(focusedValue.toLowerCase()))
        .slice(0, 25)
        .map(emote => ({ name: emote.name, value: emote.name }));
  
      interaction.respond(filtered);
    }

}