import { MessageFlags, PermissionFlagsBits } from "discord.js";
import { handleEventError, handleCommandError } from '../utils/errorHandler.js';

export default {
  name: "interactionCreate",
  once: false,

  async execute(interaction, client) {
    try {
      // Handle button interactions
      if (interaction.isButton()) {
        await handleButtonInteraction(interaction, client);
        return;
      }
      
      // Only process chat commands and autocomplete interactions
      if (!interaction.isChatInputCommand() && !interaction.isAutocomplete())
        return;

      const commandName = interaction.commandName;
      
      // Get command from lazy loader if available, otherwise fall back to the commands map
      let command;
      if (client.commandLoader) {
        command = await client.commandLoader.getCommand(commandName);
      } else {
        command = client.commands.get(commandName);
      }
      
      if (!command) return;

      try {
        // Track command usage for memory optimization
        if (client.commandCooldowns) {
          const usageKey = `${interaction.user.id}:${commandName}`;
          client.commandCooldowns.set(usageKey, Date.now());
        }
        
        if (interaction.isAutocomplete() && command.autocomplete) {
          await command.autocomplete(interaction);
        } else {
          await command.execute(interaction);
        }
      } catch (error) {
        // Use the centralized command error handler
        handleCommandError(error, interaction, commandName);
        
        // Reply to the user if possible
        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({
            content: `There was an error while executing this command!`,
            flags: MessageFlags.Ephemeral,
          });
        } else if (interaction.deferred) {
          await interaction.editReply({
            content: `There was an error while executing this command!`,
          });
        }
      }
    } catch (error) {
      // Handle any errors in the event handler itself
      handleEventError(error, 'interactionCreate', {
        interactionId: interaction.id,
        interactionType: interaction.type,
        userId: interaction.user?.id,
        guildId: interaction.guild?.id
      });
    }
  },
};

// Handle button interactions
async function handleButtonInteraction(interaction, client) {
  try {
    const { customId } = interaction;
    
    // Check if the user has permission to use these buttons
    const member = interaction.member;
    const hasPermission = member.permissions.has(PermissionFlagsBits.ManageGuild) || 
                         member.user.username === "m.w.";
    
    // Handle giveaway end button
    if (customId === 'giveaway_end') {
      if (!hasPermission) {
        return interaction.reply({
          content: "Only moderators can end giveaways.",
          flags: MessageFlags.Ephemeral,
        });
      }
      
      // Check if there's an active giveaway
      if (!client.activeGiveaway || client.activeGiveaway.ended) {
        return interaction.reply({
          content: "There is no active giveaway to end.",
          flags: MessageFlags.Ephemeral,
        });
      }
      
      // Get giveaway information
      const { channelId, messageId, hostId, prize, winnersCount } = client.activeGiveaway;
      const channel = await client.channels.fetch(channelId);
      
      // Clear the timeout if it exists
      if (client.giveawayTimeout) {
        clearTimeout(client.giveawayTimeout);
        client.giveawayTimeout = null;
      }
      
      // End the giveaway
      await interaction.reply({
        content: "Ending the giveaway now...",
        flags: MessageFlags.Ephemeral,
      });
      
      // Import the endGiveaway function from giveaway.js
      const giveawayCommand = await import('../commands/giveaway.js');
      const endGiveaway = giveawayCommand.default.endGiveaway || 
                         (typeof giveawayCommand.endGiveaway === 'function' ? 
                          giveawayCommand.endGiveaway : null);
      
      if (typeof endGiveaway === 'function') {
        await endGiveaway(client, channel, messageId, hostId, prize, winnersCount);
      } else {
        // Fallback if function not found
        console.error("[GIVEAWAY] endGiveaway function not found");
        await interaction.followUp({
          content: "There was an error ending the giveaway.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
    
    // Handle giveaway reroll button
    else if (customId.startsWith('giveaway_reroll_')) {
      if (!hasPermission) {
        return interaction.reply({
          content: "Only moderators can reroll giveaway winners.",
          flags: MessageFlags.Ephemeral,
        });
      }
      
      // Extract message ID from the custom ID
      const messageId = customId.replace('giveaway_reroll_', '');
      
      // Import the rerollWinners function from giveaway.js
      const giveawayCommand = await import('../commands/giveaway.js');
      const rerollWinners = giveawayCommand.default.rerollWinners || 
                           (typeof giveawayCommand.rerollWinners === 'function' ? 
                            giveawayCommand.rerollWinners : null);
      
      if (typeof rerollWinners === 'function') {
        await rerollWinners(interaction, messageId);
      } else {
        // Fallback if function not found
        console.error("[GIVEAWAY] rerollWinners function not found");
        await interaction.reply({
          content: "There was an error rerolling the winners.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  } catch (error) {
    console.error("[BUTTON] Error handling button interaction:", error);
    handleEventError(error, 'buttonInteraction', {
      customId: interaction.customId,
      userId: interaction.user?.id,
      guildId: interaction.guild?.id
    });
    
    // Reply to the user if possible
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: `There was an error processing this button!`,
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}
