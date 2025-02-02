const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`awaken`)
    .setDescription(`Awakenings Simulation`)
    .addNumberOption(option =>
      option
      .setName(`times`)
      .setDescription(`Number of times to awaken`)
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(999)
    ),

    async execute(interaction) {
        const allowedChannelId = "1328069031118377103";
              if (interaction.channelId !== allowedChannelId) {
                return interaction.reply({
                  content: "This command can only be used in #bot-spam channel.",
                  flags: MessageFlags.Ephemeral,
                });
              }
              
              const pool = [
                {
                  answer: "E-",
                  probability: 0.043,
                  emoji: `<:awakenem:1328076005197348984>`,
                },
                {
                  answer: "E",
                  probability: 0.198,
                  emoji: `<:awakene:1328071268146085969>`,
                },
                {
                  answer: "E+",
                  probability: 0.288,
                  emoji: `<:awakenep:1328076026110148739>`,
                },
                {
                  answer: "D-",
                  probability: 0.2,
                  emoji: `<:awakendm:1328075963699040389>`,
                },
                {
                  answer: "D",
                  probability: 0.092,
                  emoji: `<:awakend:1328071247384416286>`,
                },
                {
                  answer: "D+",
                  probability: 0.048,
                  emoji: `<:awakendp:1328075988877443073>`,
                },
                {
                  answer: "C-",
                  probability: 0.044,
                  emoji: "<:awakencm:1328075931754954772>",
                },
                {
                  answer: "C",
                  probability: 0.043,
                  emoji: "<:awakenc:1328071228300197980>",
                },
                {
                  answer: "C+",
                  probability: 0.0213,
                  emoji: "<:awakencp:1328075947437592676>",
                },
                {
                  answer: "B-",
                  probability: 0.0162,
                  emoji: "<:awakenbm:1328076518412521564>",
                },
                {
                  answer: "B",
                  probability: 0.0055,
                  emoji: "<:awakenb:1328071210860286124>",
                },
                {
                  answer: "B+",
                  probability: 0.000745,
                  emoji: "<:awakenbp:1328076535055384757>",
                },
                {
                  answer: "A-",
                  probability: 0.00015,
                  emoji: "<:awakenam:1328076470895116319>",
                },
                {
                  answer: "A",
                  probability: 0.000065,
                  emoji: "<:awakena:1328071192753602600>",
                },
                {
                  answer: "A+",
                  probability: 0.000025,
                  emoji: "<:awakenap:1328076502218313799>",
                },
                {
                  answer: "S",
                  probability: 0.000005,
                  emoji: "<:awakens:1328071289763659949>",
                },
                {
                  answer: "SS",
                  probability: 0.000005,
                  emoji: "<:awakenss:1329829671113855087>",
                },
                {
                  answer: "SSS",
                  probability: 0.000005,
                  emoji: "<:awakensss:1329829693968613428>",
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
        
              for (const [answer, count] of Object.entries(results)) {
                if (count > 0) {
                  const poolItem = pool.find((item) => item.answer === answer);
                  reply += `${poolItem?.emoji} -> **${count}** times\n`;
                }
              }
        
              return interaction.reply(reply);
    }
}