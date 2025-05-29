# ExileBot Command Creation Guide

This guide explains how to create new commands for ExileBot, covering both slash commands and message commands.

## Table of Contents

- [Slash Commands](#slash-commands)
  - [Basic Structure](#basic-structure)
  - [Command Options](#command-options)
  - [Permissions](#permissions)
  - [Example Slash Command](#example-slash-command)
- [Message Commands](#message-commands)
  - [Basic Structure](#basic-structure-1)
  - [Aliases](#aliases)
  - [Example Message Command](#example-message-command)
- [Best Practices](#best-practices)
  - [Error Handling](#error-handling)
  - [Command Categories](#command-categories)
  - [Performance Considerations](#performance-considerations)

## Slash Commands

Slash commands are Discord's modern way of implementing commands. They appear in the Discord UI when a user types `/` and provide a structured interface for command options.

### Basic Structure

All slash commands should be placed in the `src/commands/` directory as individual JavaScript files. Each command file should export a default object with the following structure:

```javascript
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("command-name")
    .setDescription("Description of what the command does"),

  async execute(interaction) {
    // Command logic goes here
    await interaction.reply("Command response");
  }
};
```

### Command Options

You can add options to your slash commands to collect input from users:

```javascript
.addStringOption(option =>
  option
    .setName("input")
    .setDescription("The input for the command")
    .setRequired(true)
)
```

Common option types include:
- `addStringOption` - For text input
- `addIntegerOption` - For whole numbers
- `addNumberOption` - For decimal numbers
- `addBooleanOption` - For true/false values
- `addUserOption` - For selecting a user
- `addChannelOption` - For selecting a channel
- `addRoleOption` - For selecting a role

### Permissions

To restrict commands to users with specific permissions:

```javascript
import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("admin-command")
    .setDescription("An admin-only command")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.reply("Admin command executed");
  }
};
```

### Example Slash Command

Here's a complete example of a slash command that takes a number input and responds with that number squared:

```javascript
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("square")
    .setDescription("Squares a number")
    .addIntegerOption(option =>
      option
        .setName("number")
        .setDescription("The number to square")
        .setRequired(true)
    ),

  async execute(interaction) {
    const number = interaction.options.getInteger("number");
    const result = number * number;
    await interaction.reply(`${number}² = ${result}`);
  }
};
```

## Message Commands

Message commands are triggered by a prefix (default: `!`) followed by the command name in a message.

### Basic Structure

All message commands should be placed in the `src/messageCommands/` directory as individual JavaScript files. Each command file should export a default object with the following structure:

```javascript
export default {
  name: "command-name",
  description: "Description of what the command does",

  async execute(message) {
    // Command logic goes here
    await message.channel.send("Command response");
  }
};
```

### Aliases

You can add aliases to message commands to allow multiple trigger words for the same command:

```javascript
export default {
  name: "primary-name",
  aliases: ["alias1", "alias2"],
  description: "Command with aliases",

  async execute(message) {
    await message.channel.send("Command executed");
  }
};
```

### Example Message Command

Here's a complete example of a message command that sends a random joke:

```javascript
export default {
  name: "joke",
  aliases: ["funny", "laugh"],
  description: "Sends a random joke",

  async execute(message) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "Why don't eggs tell jokes? They'd crack each other up!"
    ];
    
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    await message.channel.send(randomJoke);
  }
};
```

## Best Practices

### Error Handling

Always include error handling in your commands to prevent the bot from crashing:

```javascript
async execute(interaction) {
  try {
    // Command logic
    await interaction.reply("Command executed successfully");
  } catch (error) {
    console.error("Error executing command:", error);
    
    // Use the error handler utility if available
    if (interaction.client.errorHandler) {
      interaction.client.errorHandler.handleCommandError(error, interaction, "command-name");
    } else {
      // Fallback error handling
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply({ content: "There was an error executing this command!" });
      } else {
        await interaction.reply({ content: "There was an error executing this command!", ephemeral: true });
      }
    }
  }
}
```

### Command Categories

When creating a new command, consider which category it belongs to and update the `src/utils/commandCategories.js` file accordingly. This helps organize commands in the help menu.

### Performance Considerations

With ExileBot's memory optimization features, keep these performance tips in mind:

1. **Lazy Loading**: Commands are loaded only when needed. Make sure your command doesn't import heavy dependencies in the global scope.

2. **Resource Usage**: For resource-intensive commands, consider implementing throttling or cooldowns.

3. **Caching**: Use the `cacheManager` for data that's frequently accessed but rarely changed:

```javascript
// Get data from cache or compute it
const data = await interaction.client.cacheManager.getOrSet(
  "cache-key",
  async () => {
    // Expensive operation to get data
    return computedData;
  },
  { ttl: 3600 } // Cache for 1 hour
);
```

4. **Memory Usage**: Avoid storing large amounts of data in memory. For large datasets, consider using a database or file storage.

---

After creating a new command, remember to deploy it using:

```bash
npm run deploy
```

This will register your slash commands with Discord's API so they appear in the Discord client.