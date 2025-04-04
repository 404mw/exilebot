import { SlashCommandBuilder } from "discord.js";
import sehpValues from "../utils/seHp.js";

export default {
  data: new SlashCommandBuilder()
    .setName(`se`)
    .setDescription(`Calculates Remaining HP of Star Expedition boss for you`)
    .addIntegerOption((option) =>
      option
        .setName(`hp`)
        .setDescription(`Provide the current HP bar here (1-200)`)
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(200)
    )
    .addIntegerOption((option) =>
      option
        .setName(`percentage`)
        .setDescription(`Provide the remaining % here (1-100)`)
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(100)
    ),

  async execute(interaction) {
    const input1 = interaction.options.getInteger("hp");
    const input2 = interaction.options.getInteger("percentage");

    let bossEmoji;
    let response;

    bossEmoji = input1 <= 100 ? bossEmoji = `<a:se2g:1349453030025859123>` : `<a:se1g:1353437489708269628>`
    response = input1 < 100 ? response = `**Note**: \`1-99\`<:hp:1325816948889747456> is inaccurate/outdated\n\n` : ""

    let predefinedValue = sehpValues[input1];

    if (!input2) {
      if (predefinedValue >= 1e14) {
        predefinedValue = predefinedValue.toExponential(13);
      }

      response += `> **x${input1}** <:hp:1325816948889747456> at **100%**\n > \n > ${bossEmoji} **${predefinedValue}**`;
    } else {
      let result = (predefinedValue * input2) / 100;

      if (result >= 1e14) {
        result = result.toExponential(13);
      }

      response += `> **x${input1}** <:hp:1325816948889747456> at **${input2}%**\n > \n > ${bossEmoji} **${result}** remaining`;
    }
    return interaction.reply(response);
  },
};
