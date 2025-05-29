import { SlashCommandBuilder, MessageFlags } from "discord.js";
import costs from "../utils/dtCost.js";
import temple from "../utils/templeCost.js";

export default {
  data: new SlashCommandBuilder()
    .setName(`dt_calc`)
    .setDescription(
      `Counts Destiny mats and calculates the required amount for next temple upgrade`
    )
    .addIntegerOption((option) =>
      option
        .setName(`origin`)
        .setDescription(`Provide Origin(D1) heroes here (limit 1-16)`)
        .setMinValue(1)
        .setMaxValue(16)
    )
    .addIntegerOption((option) =>
      option
        .setName(`surge`)
        .setDescription(`Provide Surge(D2) heroes here (limit 1-16)`)
        .setMinValue(1)
        .setMaxValue(16)
    )
    .addIntegerOption((option) =>
      option
        .setName(`chaos`)
        .setDescription(`Provide Chaos(D3) heroes here (limit 1-16)`)
        .setMinValue(1)
        .setMaxValue(16)
    )
    .addIntegerOption((option) =>
      option
        .setName(`core`)
        .setDescription(`Provide Core(D4) heroes here (limit 1-16)`)
        .setMinValue(1)
        .setMaxValue(16)
    )
    .addIntegerOption((option) =>
      option
        .setName(`polystar`)
        .setDescription(`Provide Polystar(D5) heroes here (limit 1-16)`)
        .setMinValue(1)
        .setMaxValue(16)
    )
    .addIntegerOption((option) =>
      option
        .setName(`nirvana`)
        .setDescription(`Provide Nirvana(D6) heroes here (limit 1-12)`)
        .setMinValue(1)
        .setMaxValue(12)
    )
    .addIntegerOption((option) =>
      option
        .setName(`bag_aurora`)
        .setDescription(`Provide Aurora Gems in Bag here (1-100)`)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .addIntegerOption((option) =>
      option
        .setName(`bag_spirit`)
        .setDescription(
          `Provide Scattered Spiritvein Shards in bag here, type 100000 for 100k (max 999999)`
        )
        .setMinValue(1)
        .setMaxValue(999999)
    )
    .addIntegerOption((option) =>
      option
        .setName(`goal_temple_level`)
        .setDescription(`Provide your Next Temple level here (1-22)`)
        .setMinValue(1)
        .setMaxValue(22)
    ),

  async execute(interaction) {
    const bagGems = interaction.options.getInteger("bag_aurora");
    const bagSpirit = interaction.options.getInteger("bag_spirit");
    const inputTemple = interaction.options.getInteger("goal_temple_level");

    // Get emojis from config
    const emojis = interaction.client.config.emojis;

    let reply = "";
    let totalGem = 0;
    let totalSpirit = 0;
    let hasInput = false;

    for (const { name, gem, spiritvein, emoji } of costs) {
      const userInput = interaction.options.getInteger(name);
      if (userInput !== null) {
        hasInput = true;
        const resultGem = userInput * gem;
        const resultSpirit = userInput * spiritvein;
        reply += `${emoji}: \`${userInput}\`\n${emojis.gem}: \`${resultGem}\`\n${emojis.spiritvein}: \`${resultSpirit}\`\n\n`;
        totalGem += resultGem;
        totalSpirit += resultSpirit;
      }
    }

    if (bagGems || bagSpirit) {
      hasInput = true;
      reply += `\n${emojis.bag}\n`;
      if (bagGems) {
        reply += `${emojis.gem}: \`${bagGems}\`\n`;
      }
      if (bagSpirit) {
        reply += `${emojis.spiritvein}: \`${bagSpirit}\`\n`;
      }
    }

    if (inputTemple !== null) {
      hasInput = true;
      const getTempleData = temple.find((t) => t.level === inputTemple);

      reply += `\n**__Goal Temple__** -> \`${inputTemple}\`:\nRequirements: ${
        emojis.gem
      } \`${getTempleData.gem}\` and ${emojis.spiritvein} \`${
        getTempleData.spiritvein
      }\`\nAt Hand: ${emojis.gem}\`${totalGem + bagGems}\` and ${
        emojis.spiritvein
      } \`${totalSpirit + bagSpirit}\`\n`;

      const resultTempleGem = getTempleData.gem - (totalGem + bagGems);
      const resultTempleSpirit =
        getTempleData.spiritvein - (totalSpirit + bagSpirit);

      if (resultTempleGem > 0 || resultTempleSpirit > 0) {
        hasInput = true;
        reply += `\nMissing amount: `;

        if (resultTempleGem > 0) {
          reply += `${emojis.gem}\`${resultTempleGem}\` `;
        }

        if (resultTempleSpirit > 0) {
          reply += `${emojis.spiritvein} \`${resultTempleSpirit}\` `;
        }
      }

      if (resultTempleGem < 0 || resultTempleSpirit < 0) {
        hasInput = true;
        reply += `\nExceeded amount: `;

        if (resultTempleGem < 0) {
          reply += `${emojis.gem}\`${Math.abs(resultTempleGem)}\` `;
        }

        if (resultTempleSpirit < 0) {
          reply += `${emojis.spiritvein} \`${Math.abs(resultTempleSpirit)}\` `;
        }
      }
    } else if (inputTemple == null && reply) {
      hasInput = true;
      reply += `\n**__Total Sum:__**\n${emojis.gem} : \`${
        totalGem + bagGems
      }\`\n${emojis.spiritvein} : \`${totalSpirit + bagSpirit}\``;
    }

    if (hasInput) {
      interaction.reply(reply);
    } else {
      interaction.reply({
        content: "Something went wrong or incorrect input provided",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
