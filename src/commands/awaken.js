import { SlashCommandBuilder, MessageFlags } from "discord.js";
import pool from "../utils/awaPool.js";

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
