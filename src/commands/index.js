import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function loadCommands(client) {
  const commandFiles = (await readdir(__dirname)).filter(
    (file) => file.endsWith(".js") && file !== "index.js"
  );

  for (const file of commandFiles) {
    const filePath = pathToFileURL(join(__dirname, file)).href;

    try {
      const { default: command } = await import(filePath);

      if (!command || !command.data || !command.execute) {
        console.warn(`⚠️ Warning: ${file} is missing "data" or "execute"!`);
        continue;
      }

      client.commands.set(command.data.name, command);
    } catch (error) {
      console.error(`❌ Failed to load ${file}:`, error);
    }
  }
}
