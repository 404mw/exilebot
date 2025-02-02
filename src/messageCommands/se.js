const { MessageFlags } = require("discord.js");

module.exports = {
    name: "se",
    description: "Directs the user to /se",

    execute(message) {
        return message.reply({
            content: `This command has switched to \`/se\``,
            flags: MessageFlags.Ephemeral
          });
    }
};
