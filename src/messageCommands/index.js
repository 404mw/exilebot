import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function loadMessageCommands(client) {
  client.messageCommands = new Map();
  client.aliases = new Map();

  const commandFiles = (await readdir(__dirname)).filter(file => file.endsWith(".js") && file !== "index.js");

  for (const file of commandFiles) {
    const filePath = pathToFileURL(join(__dirname, file)).href;

    try {
      const { default: command } = await import(filePath);

      if (!command || !command.name || !command.execute) {
        console.warn(`⚠️ Warning: ${file} is missing "name" or "execute"!`);
        continue;
      }

      client.messageCommands.set(command.name, command);

      // Handle Aliases
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach(alias => client.aliases.set(alias, command.name));
      }

    } catch (error) {
      console.error(`❌ Failed to load ${file}:`, error);
    }
  }
}
