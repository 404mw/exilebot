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
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.commands = new Map();
client.messageCommands = new Map();
client.aliases = new Map();
client.reactions = new Map();

const token = process.env.TOKEN;

await loadCommands(client);
await loadMessageCommands(client);
await loadEvents(client);

client.login(token);