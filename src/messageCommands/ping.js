module.exports = {
    name: "ping",
    description: "Sends Pong and later edits the message with response time",

    execute(message) {
        const sentTime = Date.now(); // Capture the timestamp when the bot processes the command

    message.reply("Pong! 🏓").then((replyMessage) => {
      const responseTime = Date.now() - sentTime; // Calculate response time
      
      // Format response time to one decimal place
      const formattedResponseTime = (responseTime / 100).toFixed();

      replyMessage.edit(`Pong! 🏓 \n **${formattedResponseTime}ms**`);
    });
    }
};
