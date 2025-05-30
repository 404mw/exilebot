import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help from your own bot"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x588543)
      .setTitle("__**Exile's own amazing bot**__")
      .setDescription(
        `All the active \`/commands\` are listed here:\n-------------------------------------------- \n`
      )
      .addFields(
        {
          name: "`/se`",
          value:
            "> Calculates remaining HP of <a:se2g:1349453030025859123> Star Expedition boss",
        },
        {
          name: "`/awaken`",
          value:
            "> Run a simulation of awakenings and get your <:awakensss:1329829693968613428> today",
        },
        {
          name: "`/emote`",
          value:
            "> No Nitro!!!?? No Worries. Send nitro emotes to spice up the chat",
        },
        {
          name: "`/get_dt_mats`",
          value:
            "> - counts <:auroragem:1332031851048472627> and <:spiritvein:1333082447772123146> invested in your heroes, can also be used to determine the cost\n> - Also compares with the required amount for next temple upgrade",
        },
        {
          name: "`/ask`",
          value:
            "> Frendo AI at your service, ask anything and get a quick response in chat",
        },
        {
          name: "`/giveaway`",
          value:
            "> Starts a giveaway with a custom title, duration, number of winners, and host. Only moderators can use it. Participants react with <:gopnik:1325482731551068170> to enter, and winners are chosen randomly when time is up.",
        }
      )
      .setThumbnail(interaction.client.user.displayAvatarURL());

    return interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  },
};
