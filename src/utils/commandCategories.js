/**
 * Command Categories for ExileBot
 * Organizes commands into logical groups
 */

export default {
  // Categories for slash commands
  slashCommands: {
    GAME: {
      name: 'Game',
      description: 'Commands related to Idle Heroes game mechanics',
      commands: ['se', 'dt_calc', 'awaken']
    },
    UTILITY: {
      name: 'Utility',
      description: 'Utility commands for server management and information',
      commands: ['help', 'giveaway']
    },
    FUN: {
      name: 'Fun',
      description: 'Fun commands for entertainment',
      commands: ['emote', 'ask']
    }
  },
  
  // Categories for message commands (prefix commands)
  messageCommands: {
    MEMES: {
      name: 'Memes',
      description: 'Meme and reaction commands',
      commands: ['adrian', 'classic', 'ctv', 'dab', 'daddy', 'fold', 'hunor', 'james', 'jaz', 'kongen', 'mapi', 'mw', 'neky', 'patar', 'peitho', 'queen', 'redz', 'se', 'stepsis', 'tok', 'wexon', 'wick']
    },
    UTILITY: {
      name: 'Utility',
      description: 'Utility message commands',
      commands: ['ping']
    }
  }
};