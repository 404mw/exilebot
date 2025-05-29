import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

// Function to end a giveaway and select winners
export async function endGiveaway(client, channel, messageId, hostId, prize, winnersCount) {
  console.log("[GIVEAWAY] Timer triggered. Fetching message...");

  try {
    const updatedMessage = await channel.messages.fetch(messageId);
    await updatedMessage.fetch(); // Force full fetch in case of stale state

    const reaction = updatedMessage.reactions.cache.get("🎉");

    if (!reaction) {
      console.log("[GIVEAWAY] No 🎉 reaction found even after .fetch().");
      return;
    }

    const users = (await reaction.users.fetch()).filter((u) => !u.bot);
    const userArray = Array.from(users.values());

    const winners = userArray
      .sort(() => 0.5 - Math.random())
      .slice(0, winnersCount);

    // Get the original embed
    const originalEmbed = updatedMessage.embeds[0];
    const resultEmbed = EmbedBuilder.from(originalEmbed).setDescription(
      `**${prize}** giveaway ended!\n` +
      `Hosted by: <@${hostId}>\n` +
      `🎯 Winners: <a:blob_party:1377007853377814809>${
        winners.map((u) => `<@${u.id}>`).join(", ") || "No valid entries"
      }\n` +
      `⏰ Ended!`
    );

    // Create reroll button
    const rerollButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`giveaway_reroll_${messageId}`)
        .setLabel("Reroll Winners")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🔄")
    );

    await updatedMessage.edit({
      content: "Giveaway ended!",
      embeds: [resultEmbed],
      components: [rerollButton],
    });

    if (winners.length > 0) {
      await channel.send({
        content: `<a:peepo_party:1377004703296262214> Congratulations ${winners
          .map((u) => `<@${u.id}>`)
          .join(", ")}! You won **${prize}**!<a:peepo_party:1377004703296262214>\n contact <@${hostId}> ASAP to claim your prize.`,
        allowedMentions: { users: winners.map((u) => u.id) },
      });
    } else {
      await channel.send(`<:sadgeplant:1377008454526566665> No valid entries, no winner for **${prize}**.`);
    }

    // Update giveaway status
    if (client.activeGiveaway && client.activeGiveaway.messageId === messageId) {
      client.activeGiveaway.ended = true;
      client.activeGiveaway.winners = winners.map(u => u.id);
      
      // Clear the timeout if it exists
      if (client.giveawayTimeout) {
        clearTimeout(client.giveawayTimeout);
        client.giveawayTimeout = null;
      }
    }
  } catch (error) {
    console.error("[GIVEAWAY] Error ending giveaway:", error);
  } finally {
    client.activeGiveaway = null;
  }
}

// Function to reroll winners
export async function rerollWinners(interaction, messageId) {
  const client = interaction.client;
  const channel = interaction.channel;
  
  try {
    const message = await channel.messages.fetch(messageId);
    const reaction = message.reactions.cache.get("🎉");
    
    if (!reaction) {
      return interaction.reply({
        content: "Could not find the giveaway reaction.",
        flags: MessageFlags.Ephemeral,
      });
    }
    
    // Get the original embed to extract information
    const embed = message.embeds[0];
    const description = embed.description;
    
    // Extract prize and host from the embed
    const prizeLine = description.split('\n').find(line => line.includes('giveaway ended'));
    const hostLine = description.split('\n').find(line => line.includes('Hosted by:'));
    
    if (!prizeLine || !hostLine) {
      return interaction.reply({
        content: "Could not parse giveaway information from the embed.",
        flags: MessageFlags.Ephemeral,
      });
    }
    
    const prize = prizeLine.match(/\*\*(.*?)\*\*/)?.[1] || "prize";
    const hostId = hostLine.match(/<@(\d+)>/)?.[1];
    
    // Get users who reacted
    const users = (await reaction.users.fetch()).filter((u) => !u.bot);
    const userArray = Array.from(users.values());
    
    // Determine number of winners (default to 1 if can't be determined)
    const winnersCount = 1;
    
    // Select new winners
    const winners = userArray
      .sort(() => 0.5 - Math.random())
      .slice(0, winnersCount);
    
    // Update the embed with new winners
    const resultEmbed = EmbedBuilder.from(embed).setDescription(
      `**${prize}** giveaway ended!\n` +
      `Hosted by: <@${hostId}>\n` +
      `🎯 Winners (Rerolled): <a:blob_party:1377007853377814809>${
        winners.map((u) => `<@${u.id}>`).join(", ") || "No valid entries"
      }\n` +
      `⏰ Ended!`
    );
    
    await message.edit({
      embeds: [resultEmbed],
      components: [message.components[0]], // Keep the same button
    });
    
    if (winners.length > 0) {
      await channel.send({
        content: `🔄 **REROLLED WINNERS**\n<a:peepo_party:1377004703296262214> Congratulations ${winners
          .map((u) => `<@${u.id}>`)
          .join(", ")}! You won **${prize}**!<a:peepo_party:1377004703296262214>\n contact <@${hostId}> ASAP to claim your prize.`,
        allowedMentions: { users: winners.map((u) => u.id) },
      });
      
      await interaction.reply({
        content: `Successfully rerolled winners for the giveaway.`,
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await channel.send(`<:sadgeplant:1377008454526566665> No valid entries for reroll, no winner for **${prize}**.`);
      
      await interaction.reply({
        content: `No valid entries for reroll.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  } catch (error) {
    console.error("[GIVEAWAY] Error rerolling winners:", error);
    await interaction.reply({
      content: `There was an error rerolling the winners: ${error.message}`,
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Start a giveaway")
    .addStringOption((option) =>
      option
        .setName("prize")
        .setDescription("Prize and title of the giveaway")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("Duration of the giveaway")
        .setRequired(true)
        .addChoices(
          { name: "1 hour", value: "1hr" },
          { name: "12 hours", value: "12hr" },
          { name: "24 hours", value: "24hr" }
        )
    )
    .addUserOption((option) =>
      option
        .setName("host")
        .setDescription("Host of the giveaway")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("winners")
        .setDescription("Number of winners")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(3)
    )
    .addBooleanOption((option) =>
      option
        .setName("mention")
        .setDescription("Allow me to mention @everyone or not")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Custom message to display")
        .setRequired(false)
        .setMaxLength(200)
  )
    .setDefaultMemberPermissions(null),

  async execute(interaction) {
    const member = interaction.member;
    if (
      !(
        member.permissions.has(PermissionFlagsBits.ManageGuild) ||
        member.user.username === "m.w."
      )
    ) {
      return interaction.reply({
        content: "Only moderators can use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const client = interaction.client;

    if (client.activeGiveaway) {
      return interaction.reply({
        content: "A giveaway is already active. Wait for it to finish.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const item = interaction.options.getString("prize");
    const durationChoice = interaction.options.getString("duration");
    const host = interaction.options.getUser("host");
    const winnersCount = interaction.options.getInteger("winners");
    const mention = interaction.options.getBoolean("mention");
    const customMessage = interaction.options.getString("message");

    const durationMap = {
      "1hr": 3600,
      "12hr": 43200,
      "24hr": 86400,
    };

    const duration = durationMap[durationChoice];
    const endsAt = Date.now() + duration * 1000;
    const giveawayChannelId = "1076157810003431528";
    const channel = await client.channels.fetch(giveawayChannelId);

    const embed = new EmbedBuilder()
      .setTitle(
        `<a:peepo_partyhat:1377007874777157632> A new giveaway in Exile <a:peepo_partyhat:1377007874777157632>`
      )
      .setDescription(
        `**${item}** up for grabs!\n\n` +
        `React with 🎉 to enter!\n\n` +
        `Hosted by: <@${host.id}>\n` +
        `Winners: **${winnersCount}**\n` +
        `Ends in: <t:${Math.floor(endsAt / 1000)}:R>`
      )
      .setColor(0x588543)
      .setFooter({ text: `Hosted by ${host.tag}` })
      .setTimestamp()
      .setThumbnail(
        "https://cdn.discordapp.com/emojis/1264891543408476231.png"
      );

    // Create buttons for giveaway management
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`giveaway_end`)
        .setLabel("Skip the timer now")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("⏱️")
    );

    const message = await channel.send({
      content: `${mention ? "@everyone" : ""}\n${customMessage || ""}`,
      embeds: [embed],
      components: [buttons],
      allowedMentions: { parse: ["everyone"] },
    });

    await message.react("🎉");
    client.activeGiveaway = {
      messageId: message.id,
      channelId: channel.id,
      hostId: host.id,
      prize: item,
      winnersCount: winnersCount,
      endsAt: endsAt,
      ended: false
    };

    await interaction.reply({
      content: `Giveaway has started in ${channel}!`,
      flags: MessageFlags.Ephemeral,
    });

    // Set timeout for giveaway end
    client.giveawayTimeout = setTimeout(async () => {
      await endGiveaway(client, channel, message.id, host.id, item, winnersCount);
    }, duration * 1000);
  },
  
  // Export functions for external use
  endGiveaway,
  rerollWinners
};
