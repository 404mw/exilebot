import { SlashCommandBuilder } from "discord.js";
import sehpValues from "../utils/seHp.js";

export default {
  data: new SlashCommandBuilder()
    .setName(`se`)
    .setDescription(`Calculates Remaining HP of Star Expedition boss for you`)
    .addNumberOption((option) =>
      option
        .setName(`hp`)
        .setDescription(`Provide the current HP bar here`)
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(200)
    )
    .addNumberOption((option) =>
      option
        .setName(`percentage`)
        .setDescription(`Provide the remaining % here`)
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(100)
    ),

  async execute(interaction) {
    const input1 = interaction.options.getNumber("hp");
    const input2 = interaction.options.getNumber("percentage");

    let bossEmoji;
    let response = `**Note**: \`1-99\`<:hp:1325816948889747456> is inaccurate/old\n\n`;

    if (input1 < 101) {
      bossEmoji = `<:se2:1335306043529367602>`;
    } else if (input1 > 100) {
      bossEmoji = `<:se1:1335306027356258428>`;
    }

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
