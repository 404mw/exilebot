const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.commands = new Map();

  const commandFiles = fs.readdirSync(__dirname).filter(file => 
    file.endsWith(".js") && file !== "index.js"
  );

  for (const file of commandFiles) {
    const command = require(path.join(__dirname, file));
    client.commands.set(command.data.name, command);
  }
};
