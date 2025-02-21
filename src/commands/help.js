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
            "> Calculates remaining HP of <:se2:1335306043529367602> Star Expedition boss",
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
        }
      )
      .setThumbnail(interaction.client.user.displayAvatarURL());

    return interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  },
};
