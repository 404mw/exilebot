import { SlashCommandBuilder, Collection, MessageFlags } from "discord.js";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Cooldown map
const userCooldowns = new Collection();

// Get __dirname in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const memoryPath = path.join(__dirname, "../../data/memory.json");

async function loadMemory() {
  try {
    const data = await fs.readFile(memoryPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to load memory:", err);
    return [];
  }
}

async function saveMemory(memory) {
  try {
    await fs.writeFile(memoryPath, JSON.stringify(memory, null, 2));
  } catch (err) {
    console.error("Failed to save memory:", err);
  }
}

// Timer to reset memory if no new question comes in 15 mins
let memoryResetTimer = null;
function resetMemoryTimer() {
  if (memoryResetTimer) clearTimeout(memoryResetTimer);
  memoryResetTimer = setTimeout(async () => {
    await saveMemory([]);
    console.log("[Memory] Cleared after 15 minutes of inactivity.");
  }, 15 * 60 * 1000);
}

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

    if (interaction.guild.id !== process.env.SERVER_ID) {
      return interaction.reply({
        content: "This command is not accessible in this server.",
        flags: MessageFlags.Ephemeral,
      });
    }

    // Rate limiting
    const cooldownTime = interaction.client.config.cooldowns.ask;
    if (userCooldowns.has(interaction.user.id)) {
      const expiration = userCooldowns.get(interaction.user.id) + cooldownTime;
      if (Date.now() < expiration) {
        const timeLeft = ((expiration - Date.now()) / 1000).toFixed(1);
        return interaction.reply({
          content: `⏳ Wait ${timeLeft}s before asking again.`,
          flags: MessageFlags.Ephemeral,
        });
      }
    }

    userCooldowns.set(interaction.user.id, Date.now());
    setTimeout(() => userCooldowns.delete(interaction.user.id), cooldownTime);
    await interaction.deferReply();

    try {
      const memory = await loadMemory();
      resetMemoryTimer();

      const messages = [
        {
          role: "system",
          content:
            "You are Exile Bot, a sarcastic and helpful Discord Bot. Always include the user's name in your response. Keep replies short and clever.",
        },
        ...memory
          .map(({ username, question, answer }) => [
            { role: "user", content: `${username} asked: ${question}` },
            { role: "assistant", content: `${answer}` },
          ])
          .flat(),
        {
          role: "user",
          content: `${interaction.user.username} asked: ${question}`,
        },
      ];

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: process.env.OPENAI_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const answer =
        response.data.choices?.[0]?.message?.content?.trim() ||
        "No response received.";

      if (answer !== "No response received.") {
        memory.push({ question, answer });
        if (memory.length > 3) memory.shift();
        await saveMemory(memory);
        resetMemoryTimer();
      }

      const finalReply =
        answer.length >= 2000 ? answer.slice(0, 1997) + "..." : answer;
      await interaction.editReply(finalReply);
    } catch (err) {
      console.error("OpenAI Error:", err.response?.data || err.message);
      await interaction.editReply({
        content: "😔 Something went wrong while getting a response.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
