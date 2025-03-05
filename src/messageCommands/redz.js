export default {
    name: "redz",
    aliases: ["reds"],
    description: "Sends a Pepe Staring emoji",
  
    async execute(message) {
      try {
        return message.channel.send(
          "<:redz:1346924660180127866>"
        );
      } catch (error) {
        console.error("Failed to delete message or send GIF:", error);
      }
    },
  };
  