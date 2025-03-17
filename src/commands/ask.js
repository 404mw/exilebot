import { SlashCommandBuilder, Collection, MessageFlags } from "discord.js";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
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

    await interaction.deferReply();

    if (interaction.guild.id == "864172925070082068") {
      // Rate Limiting
      const cooldownTime = 60000; // 60 seconds cooldown

      if (userCooldowns.has(interaction.user.id)) {
        const expirationTime =
          userCooldowns.get(interaction.user.id) + cooldownTime;
        if (Date.now() < expirationTime) {
          const timeLeft = (expirationTime - Date.now()) / 1000;
          return interaction.reply({
            content: `Please wait ${timeLeft.toFixed(
              1
            )} more seconds before using this command.`,
            flags: MessageFlags.Ephemeral,
          });
        }
      }

      userCooldowns.set(interaction.user.id, Date.now());
      setTimeout(() => userCooldowns.delete(interaction.user.id), cooldownTime);

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${geminiApiKey}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: "You are a helpful discord bot that answers questions.",
                  },
                ],
                role: "user",
              }, //System prompt
              { parts: [{ text: question }], role: "user" },
            ],
            generationConfig: {
              maxOutputTokens: 1500, // Adjusted to leave room for Discord's limit
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Gemini API Response:", response.data);

        const answer =
          response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
          "No response received.";

        if (answer.length >= 2000) {
          // Slightly lower to account for "..."
          await interaction.editReply(answer.substring(0, 1997) + "...");
        } else {
          await interaction.editReply(answer);
        }
      } catch (error) {
        console.error(
          "API Error:",
          error.response ? error.response.data : error.message
        );
        await interaction.editReply(
          "Sorry, Something went wrong and I could not get a response"
        );
      }
    } else {
      return interaction.reply({
        content: "This command is not accessible in this server.",
        flags: MessageFlags.Ephemeral
      }
      );
    }
  },
};
