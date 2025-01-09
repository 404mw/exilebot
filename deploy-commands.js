const { REST, Routes, SlashCommandBuilder } = require("discord.js")
require('dotenv').config();

const botID = "1326179076477816852"
const serverID = "1076157809281994842"
const token = process.env.TOKEN;

const rest = new REST().setToken(token)
const slashRegister = async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(botID, serverID), {
      body: [
        new SlashCommandBuilder()
        .setName("help")
        .setDescription("Get help from your own bot"),

        new SlashCommandBuilder()
        .setName("se")
        .setDescription("Calculates Remaining HP of Star Expedition boss for you")
        .addNumberOption(option => {
          return option
          .setName("hp")
          .setDescription("Provide the correct HP bar here")
          .setRequired(true)
          .setMinValue(1)
          .setMaxValue(200)
          })
          .addNumberOption(option => {
            return option
            .setName("percentage")
            .setDescription("Provide the remaining % here")
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(100)
          })
        
      ]
    })
  } catch (error) {
    console.log(error);
    
  }
}

slashRegister();