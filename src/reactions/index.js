import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function loadReactions(client) {
  client.reactions = new Map();

  const reactionFiles = (await readdir(__dirname)).filter(file => file.endsWith(".js") && file !== "index.js");

  for (const file of reactionFiles) {
    const filePath = pathToFileURL(join(__dirname, file)).href;

    try {
      const { default: reaction } = await import(filePath);

      if (!reaction || !reaction.triggers || !reaction.execute) {
        console.warn(`⚠️ Warning: ${file} is missing "triggers" or "execute"!`);
        continue;
      }

      for (const trigger of reaction.triggers) {
        client.reactions.set(trigger.toLowerCase(), reaction);
      }
    } catch (error) {
      console.error(`❌ Failed to load ${file}:`, error);
    }
  }
}