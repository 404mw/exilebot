import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async (client) => {
  const eventsPath = join(__dirname, "../events"); // Adjust path if needed
  const eventFiles = readdirSync(eventsPath).filter((file) =>
    file.endsWith(".js")
  );

  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const event = (await import(`file://${filePath}`)).default;

    if (!event.name || !event.execute) {
      console.warn(
        `[WARNING] Event file ${file} is missing "name" or "execute" property.`
      );
      continue;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
};
