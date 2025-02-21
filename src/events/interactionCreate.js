import { MessageFlags } from "discord.js";

export default {
  name: "interactionCreate",
  once: false,

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand() && !interaction.isAutocomplete())
      return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      if (interaction.isAutocomplete() && command.autocomplete) {
        await command.autocomplete(interaction);
      } else {
        await command.execute(interaction);
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `There was an error while executing this command!`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
