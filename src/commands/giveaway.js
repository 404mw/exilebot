import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags,
} from "discord.js";

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
    const giveawayChannelId = "1376982644939821229";
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

    const message = await channel.send({
      content: `${mention ? "@everyone" : ""}\n${customMessage || ""}`,
      embeds: [embed],
      allowedMentions: { parse: ["everyone"] },
    });

    await message.react("🎉");
    client.activeGiveaway = true;

    await interaction.reply({
      content: `Giveaway has started in ${channel}!`,
      flags: MessageFlags.Ephemeral,
    });

    setTimeout(async () => {
      console.log("[GIVEAWAY] Timer triggered. Fetching message...");

      try {
        const updatedMessage = await channel.messages.fetch(message.id);
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

        const resultEmbed = EmbedBuilder.from(embed).setDescription(
          `**${item}** giveaway ended!\n` +
          `Hosted by: <@${host.id}>\n` +
          `🎯 Winners: <a:blob_party:1377007853377814809>${
            winners.map((u) => `<@${u.id}>`).join(", ") || "No valid entries"
          }\n` +
          `⏰ Ended!`
        );

        await updatedMessage.edit({
          content: "Giveaway ended!",
          embeds: [resultEmbed],
        });

        if (winners.length > 0) {
          await channel.send({
            content: `<a:peepo_party:1377004703296262214> Congratulations ${winners
              .map((u) => `<@${u.id}>`)
              .join(", ")}! You won **${item}**!<a:peepo_party:1377004703296262214>\n contact <@${host.id}> ASAP to claim your prize.`,
            allowedMentions: { users: winners.map((u) => u.id) },
          });
        } else {
          await channel.send(`<:sadgeplant:1377008454526566665> No valid entries, no winner for **${item}**.`);
        }
      } catch (error) {
        console.error("[GIVEAWAY] Error ending giveaway:", error);
      } finally {
        client.activeGiveaway = false;
      }
    }, duration * 1000);
  },
};
