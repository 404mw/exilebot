import { SlashCommandBuilder, Collection, MessageFlags } from "discord.js";
import axios from "axios";

// Use shared cooldown collection
const userCooldowns = new Collection();

export default {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask a question to Frendo AI")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Your question")
        .setRequired(true)
    ),
  async execute(interaction) {
    const question = interaction.options.getString("question");
    const config = interaction.client.config;

    // Check if command is allowed in this server
    if (interaction.guild.id !== process.env.SERVER_ID) {
      return interaction.reply({
        content: "This command is not accessible in this server.",
        flags: MessageFlags.Ephemeral,
      });
    }
    
    // Rate Limiting using config
    const cooldownTime = config.cooldowns.ask;
    if (userCooldowns.has(interaction.user.id)) {
      const expirationTime =
        userCooldowns.get(interaction.user.id) + cooldownTime;
        if (Date.now() < expirationTime) {
        const timeLeft = (expirationTime - Date.now()) / 1000;
        return interaction.reply({
          content: `Please wait ${timeLeft.toFixed(1)} more seconds before using this command.`,
          flags: MessageFlags.Ephemeral,
        });
      }
    }
    
    userCooldowns.set(interaction.user.id, Date.now());
    setTimeout(() => userCooldowns.delete(interaction.user.id), cooldownTime);
    
    await interaction.deferReply();

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a sarcastic and helpful sidekick. keep responses shorter.`,
                },
              ],
              role: "user",
            },
            { parts: [{ text: `${interaction.user.username} asked:\n\n ${question}` }], role: "user" },
          ],
          generationConfig: {
            maxOutputTokens: 1000,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No response received.";

      // Truncate to fit Discord's 2000 character limit
      const truncatedAnswer = answer.length >= 2000 ? answer.substring(0, 1997) + "..." : answer;
      await interaction.editReply(truncatedAnswer);

    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      await interaction.editReply({
        content: "Sorry, something went wrong, and I could not get a response.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
