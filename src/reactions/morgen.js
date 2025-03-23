export default {
    triggers: ["morgen", "morning", "morns", "orgen", "orning"],
    async execute(message) {
      await message.react("<a:GM_Whale:1335633850923225098>");
    }
  };