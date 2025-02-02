const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`get_dt_mats`)
    .setDescription(
      `Counts Destiny mats and calculates the required amount for next temple upgrade`
    )
    .addNumberOption((option) =>
      option
        .setName(`origin`)
        .setDescription(`Provide Origin(DT-1) heroes here`)
        .setMinValue(1)
        .setMaxValue(12)
    )
    .addNumberOption((option) =>
      option
        .setName(`surge`)
        .setDescription(`Provide Surge(DT-2) heroes here`)
        .setMinValue(1)
        .setMaxValue(12)
    )
    .addNumberOption((option) =>
      option
        .setName(`chaos`)
        .setDescription(`Provide Chaos(DT-3) heroes here`)
        .setMinValue(1)
        .setMaxValue(12)
    )
    .addNumberOption((option) =>
      option
        .setName(`core`)
        .setDescription(`Provide Core(DT-4) heroes here`)
        .setMinValue(1)
        .setMaxValue(12)
    )
    .addNumberOption((option) =>
      option
        .setName(`polystar`)
        .setDescription(`Provide Polystar(DT-5) heroes here`)
        .setMinValue(1)
        .setMaxValue(10)
    )
    .addNumberOption((option) =>
      option
        .setName(`nirvana`)
        .setDescription(`Provide Nirvana(DT-6) heroes here`)
        .setMinValue(1)
        .setMaxValue(8)
    )
    .addNumberOption((option) =>
      option
        .setName(`bag_aurora`)
        .setDescription(`Provide Aurora Gems in Bag here`)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .addNumberOption((option) =>
      option
        .setName(`bag_spirit`)
        .setDescription(
          `Provide Scattered Spiritvein Shards in bag here, type 100000 for 100k`
        )
        .setMinValue(1)
        .setMaxValue(999999)
    )
    .addNumberOption((option) =>
      option
        .setName(`goal_temple_level`)
        .setDescription(`Provide your Next Temple level here`)
        .setMinValue(1)
        .setMaxValue(16)
    ),

  async execute(interaction) {
    const bagGems = interaction.options.getNumber("bag_aurora");
    const bagSpirit = interaction.options.getNumber("bag_spirit");
    const inputTemple = interaction.options.getNumber("goal_temple_level");

    const costs = [
      {
        name: "origin",
        gem: 5,
        spiritvein: 197236,
        emoji: "<:origin:1332021165073367060>",
      },
      {
        name: "surge",
        gem: 12,
        spiritvein: 277200,
        emoji: "<:surge:1332021150586245140>",
      },
      {
        name: "chaos",
        gem: 21,
        spiritvein: 356400,
        emoji: "<:chaos:1332021096110755975>",
      },
      {
        name: "core",
        gem: 32,
        spiritvein: 435600,
        emoji: "<:core:1332021073977278544>",
      },
      {
        name: "polystar",
        gem: 45,
        spiritvein: 514800,
        emoji: "<:polystar:1332021054763303053>",
      },
      {
        name: "nirvana",
        gem: 60,
        spiritvein: 619300,
        emoji: "<:nirvana:1332021038044676096>",
      },
    ];

    const temple = [
      { level: 1, gem: 5, spiritvein: 197236 },
      { level: 2, gem: 15, spiritvein: 591708 },
      { level: 3, gem: 34, spiritvein: 948872 },
      { level: 4, gem: 54, spiritvein: 990000 },
      { level: 5, gem: 75, spiritvein: 1463672 },
      { level: 6, gem: 98, spiritvein: 1702800 },
      { level: 7, gem: 123, spiritvein: 2058436 },
      { level: 8, gem: 151, spiritvein: 2098800 },
      { level: 9, gem: 183, spiritvein: 2534400 },
      { level: 10, gem: 217, spiritvein: 2970000 },
      { level: 11, gem: 256, spiritvein: 3232900 },
      { level: 12, gem: 312, spiritvein: 3826900 },
      { level: 13, gem: 372, spiritvein: 4446200 },
      { level: 14, gem: 443, spiritvein: 5144700 },
      { level: 15, gem: 520, spiritvein: 6095100 },
      { level: 16, gem: 612, spiritvein: 7150000 },
    ];
    const emojis = {
      origin: `<:origin:1332021165073367060>`,
      surge: `<:surge:1332021150586245140>`,
      chaos: `<:chaos:1332021096110755975>`,
      core: `<:core:1332021073977278544>`,
      polystar: `<:polystar:1332021054763303053>`,
      nirvana: `<:nirvana:1332021038044676096>`,
      gem: `<:auroragem:1332031851048472627>`,
      spiritvein: `<:spiritvein:1333082447772123146>`,
      bag: `<:bag:1333083225244827698>`,
    };

    let reply = "";
    let totalGem = 0;
    let totalSpirit = 0;
    let hasInput = false;

    for (const { name, gem, spiritvein, emoji } of costs) {
      const userInput = interaction.options.getNumber(name);
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
