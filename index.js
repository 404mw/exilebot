import { Client, GatewayIntentBits } from "discord.js";
import loadCommands from "./src/commands/index.js";
import loadMessageCommands from "./src/messageCommands/index.js";
import loadEvents from "./src/utils/eventHandler.js";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Map(); // Slash commands
client.messageCommands = new Map(); // Prefix-based commands
client.aliases = new Map(); // Aliases for prefix-based commands

const token = process.env.TOKEN;

await loadCommands(client);
await loadMessageCommands(client);
await loadEvents(client);

client.login(token);
