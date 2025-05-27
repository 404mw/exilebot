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
    .addIntegerOption((option) =>
      option
        .setName("prize")
        .setDescription("Prize and title of the giveaway")
        .setRequired(true)
        .setMinValue(1)
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

    const item = interaction.options.getInteger("prize");
    const durationChoice = interaction.options.getString("duration");
    const host = interaction.options.getUser("host");
    const winnersCount = interaction.options.getInteger("winners");
    const mention = interaction.options.getBoolean("mention");

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
        `<a:peepo_partyhat:1377007874777157632> A new giveaway is happening in Exile <a:peepo_partyhat:1377007874777157632>`
      )
      .setDescription(
        `**${item}**<:SGs:1377004656168796311> up for grabs!\n
          React with <:gopnik:1325482731551068170> to enter!\n
          Hosted by: <@${host.id}>\n
          Winners: **${winnersCount}**\n
          Ends in: <t:${Math.floor(endsAt / 1000)}:R>`
      )
      .setColor(0x588543)
      .setFooter({ text: `Hosted by ${host.tag}` })
      .setTimestamp()
      .setThumbnail(
        "https://cdn.discordapp.com/emojis/1338162896278126633.png"
      );

    const message = await channel.send({
      content: mention ? "@everyone" : "",
      embeds: [embed],
      allowedMentions: { parse: ["everyone"] },
    });

    await message.react("<:gopnik:1325482731551068170>");
    client.activeGiveaway = true;

    await interaction.reply({
      content: `Giveaway has started in ${channel}!`,
      flags: MessageFlags.Ephemeral,
    });

    setTimeout(async () => {
      try {
        const updatedMessage = await channel.messages.fetch(message.id);
        const reaction = updatedMessage.reactions.cache.get("<:gopnik:1325482731551068170>");
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
          content: "@everyone",
          embeds: [resultEmbed],
          allowedMentions: { parse: ["everyone"] },
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
        console.error("Error ending giveaway:", error);
      } finally {
        client.activeGiveaway = false;
      }
    }, duration * 1000);
  },
};
