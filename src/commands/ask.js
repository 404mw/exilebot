import { SlashCommandBuilder, Collection, MessageFlags } from "discord.js";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const userCooldowns = new Collection();
const ALLOWED_GUILD_ID = process.env.SERVER_ID;

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

    if (interaction.guild.id !== ALLOWED_GUILD_ID) {
      return interaction.reply({
        content: "This command is not accessible in this server.",
        flags: MessageFlags.Ephemeral,
      });
    }
    
    // Rate Limiting
    const cooldownTime = 60000; // 60 seconds cooldown
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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${geminiApiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Respond as if you are Captain Jack Sparrow.\n * Speak in a playful, unpredictable manner with lots of confidence.\n *  Your speech may sound like you've had a bit of rum—carefree and a little slurred.\n * Offer mysterious or confusing advice, often in riddles.\n * Act like you know more than others and that you're the smartest person in the room.\n\nKey Phrases: "Ay matey!", "Savvy?", "But why is the rum gone?", "The compass doesn’t point north, it points to what you want most.","This is the day you will always remember as the day you almost caught Captain Jack Sparrow!"\n\nTone:\n * Add humor and confusion in your replies.\n * Act like you have everything under control, even when you don’t.\n * Leave a sense of intrigue in your answers.\n\n and last but not the least, keep your responses shorter.`,
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
