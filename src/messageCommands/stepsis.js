export default {
    name: "stepsis",
    aliases: ["darnell"],
    description: "Sends a gif of stepsis being punished",
  
    async execute(message) {
      try {
        await message.channel.send(
          `https://tenor.com/view/pantsahat-master-chief-astolfo-chief-washing-machine-gif-22792423a`
        );
      } catch (error) {
        console.error("Error deleting message or sending GIF:", error);
      }
    },
  };
  