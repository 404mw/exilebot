const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.messageCommands = new Map();
  client.aliases = new Map();

  const messageFiles = fs.readdirSync(__dirname).filter(file =>
    file.endsWith(".js") && file !== "index.js"
  );

  for (const file of messageFiles) {
    const command = require(path.join(__dirname, file));
    client.messageCommands.set(command.name, command);

    if (command.aliases) {
      for (const alias of command.aliases) {
        client.aliases.set(alias, command.name);
      }
    }
  }
};
