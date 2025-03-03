import { SlashCommandBuilder, MessageFlags } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName(`awaken`)
    .setDescription(`Awakenings Simulation`)
    .addNumberOption((option) =>
      option
        .setName(`times`)
        .setDescription(`Number of times to awaken`)
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(999)
    ),

  async execute(interaction) {
    
    const allowedChannel = "bot-spam";
    if (interaction.inGuild() && interaction.channel.name !== allowedChannel) {
      return interaction.reply({
        content: `This command can only be used in #${allowedChannel} channel.`,
        flags: MessageFlags.Ephemeral,
      });
    }
    
    const pool = [
      {
        answer: "E-",
        probability: 0.043,
        emoji: `<:awakenem:1328076005197348984>`,
        retire: 10,
        points: 3,
      },
      {
        answer: "E",
        probability: 0.198,
        emoji: `<:awakene:1328071268146085969>`,
        retire: 15,
        points: 4,
      },
      {
        answer: "E+",
        probability: 0.288,
        emoji: `<:awakenep:1328076026110148739>`,
        retire: 20,
        points: 5,
      },
      {
        answer: "D-",
        probability: 0.2,
        emoji: `<:awakendm:1328075963699040389>`,
        retire: 30,
        points: 6,
      },
      {
        answer: "D",
        probability: 0.092,
        emoji: `<:awakend:1328071247384416286>`,
        retire: 50,
        points: 7,
      },
      {
        answer: "D+",
        probability: 0.048,
        emoji: `<:awakendp:1328075988877443073>`,
        retire: 70,
        points: 8,
      },
      {
        answer: "C-",
        probability: 0.044,
        emoji: "<:awakencm:1328075931754954772>",
        retire: 100,
        points: 9,
      },
      {
        answer: "C",
        probability: 0.043,
        emoji: "<:awakenc:1328071228300197980>",
        retire: 150,
        points: 10,
      },
      {
        answer: "C+",
        probability: 0.0213,
        emoji: "<:awakencp:1328075947437592676>",
        retire: 200,
        points: 11,
      },
      {
        answer: "B-",
        probability: 0.0162,
        emoji: "<:awakenbm:1328076518412521564>",
        retire: 300,
        points: 12,
      },
      {
        answer: "B",
        probability: 0.0055,
        emoji: "<:awakenb:1328071210860286124>",
        retire: 600,
        points: 13,
      },
      {
        answer: "B+",
        probability: 0.000745,
        emoji: "<:awakenbp:1328076535055384757>",
        retire: 1800,
        points: 14,
      },
      {
        answer: "A-",
        probability: 0.00015,
        emoji: "<:awakenam:1328076470895116319>",
        retire: 8000,
        points: 15,
      },
      {
        answer: "A",
        probability: 0.000065,
        emoji: "<:awakena:1328071192753602600>",
        retire: 15000,
        points: 16,
      },
      {
        answer: "A+",
        probability: 0.000025,
        emoji: "<:awakenap:1328076502218313799>",
        retire: 25000,
        points: 17,
      },
      {
        answer: "S",
        probability: 0.000006,
        emoji: "<:awakens:1328071289763659949>",
        retire: 50000,
        points: 18,
      },
      {
        answer: "SS",
        probability: 0.000005,
        emoji: "<:awakenss:1329829671113855087>",
        retire: 100000,
        points: 19,
      },
      {
        answer: "SSS",
        probability: 0.000004,
        emoji: "<:awakensss:1329829693968613428>",
        retire: 200000,
        points: 20,
      },
    ];

    function getRandomAnswer(pool) {
      const random = Math.random();
      let cumulativeProbability = 0;

      for (const { answer, probability } of pool) {
        cumulativeProbability += probability;
        if (random < cumulativeProbability) {
          return answer;
        }
      }

      return null; // Fallback (in case of an error)
    }

    function runMultipleSelections(pool, iterations) {
      const results = {};

      // Initialize result counter for each answer
      pool.forEach(({ answer }) => {
        results[answer] = 0;
      });

      // Perform the selection multiple times
      for (let i = 0; i < iterations; i++) {
        const result = getRandomAnswer(pool);
        results[result] += 1;
      }

      return results;
    }

    const iterations = interaction.options.getNumber("times");

    const results = runMultipleSelections(pool, iterations);

    let reply = `You awakened **${iterations}** times:\n`;
    let totalRetire = 0;
    let totalPoints = 0;
    const totalCSG = iterations * 100;

    for (const [answer, count] of Object.entries(results)) {
      if (count > 0) {
        const poolItem = pool.find((item) => item.answer === answer);
        const csgValue = poolItem.retire * count;
        const pointsValue = poolItem.points * count;
        reply += ` - ${poolItem?.emoji}- **${count}**   ->   ${csgValue}<:csg:1338159695227129956>\n`;
        totalRetire += csgValue;
        totalPoints += pointsValue;
      }
    }

    const percentage = (totalRetire / totalCSG) * 100;
    reply += `\nCSGs Spent = \`${totalCSG}\`\nRetired Amount = \`${totalRetire}\`\nReturn Valued at = \`${percentage.toFixed(
      2
    )}%\`\n\nPoints Earned for Gala = \`${totalPoints}\`\n`;
    return interaction.reply(reply);
  },
};
