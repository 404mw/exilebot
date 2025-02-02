const { Client, GatewayIntentBits } = require("discord.js");
const loadCommands = require("./src/commands");
const loadMessageCommands = require("./src/messageCommands");
const loadEvents = require("./src/utils/eventHandler");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
require("dotenv").config();

const token = process.env.TOKEN;

loadCommands(client);
loadMessageCommands(client);
loadEvents(client);

client.login(token);
