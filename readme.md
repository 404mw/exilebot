# ExileBot

A Discord bot for the "Frendos of Exile" Discord server, providing various utilities and commands related to the mobile game Idle Heroes.

## Features

### Game-Related Commands
- `/awaken` - Simulate Awakenings with probability-based outcomes
- `/se` - Calculate Star Expedition boss HP
- `/dt_calc` - Calculate Dream Temple values
- `/giveaway` - Create and manage giveaways

### Utility Commands
- `/ask` - Ask questions to an AI using Gemini API
- `/help` - Display help information about available commands
- `/emote` - Display emotes on your behalf to spice up the chat

### Message Commands
- Various meme and fun commands triggered with the `!` prefix

## Documentation

- [Memory Optimization Guide](./docs/MEMORY_OPTIMIZATION.md) - Details on memory optimization features
- [Command Creation Guide](./docs/COMMAND_CREATION.md) - Guide for creating new commands

## Setup

### Prerequisites
- Node.js v16.9.0 or higher
- npm (Node Package Manager)
- A Discord Bot Token
- Gemini API Key (for the `/ask` command)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` and fill in your tokens
4. Start the bot: `npm start`

### Deploying Commands
To register slash commands with Discord:
```bash
npm run deploy
```

## Project Structure

```
├── index.js                # Main entry point
├── src/
│   ├── commands/          # Slash commands
│   ├── events/            # Event handlers
│   ├── messageCommands/   # Message-based commands
│   └── utils/             # Utility functions and helpers
├── docs/                  # Documentation
└── media/                 # Media files for commands
```

## Memory and Resource Optimization

ExileBot includes several memory and resource optimization features:

- **Lazy Command Loading**: Commands are loaded only when needed, reducing initial memory usage
- **Efficient Caching**: Time-based and size-limited caching system for frequently accessed data
- **Discord.js Cache Optimization**: Custom sweeping strategies for Discord.js caches
- **Memory Usage Monitoring**: Automatic tracking and logging of memory usage

See [Memory Optimization Guide](./docs/MEMORY_OPTIMIZATION.md) for details on these features and how to use them effectively.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

## License

MIT

## Author

404mw