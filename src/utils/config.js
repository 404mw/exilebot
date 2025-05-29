/**
 * Configuration file for ExileBot
 * Contains centralized constants and settings
 */

export default {
  // Bot settings
  prefix: '!',
  
  // Command settings
  cooldowns: {
    ask: 60000, // 60 seconds cooldown for ask command
    default: 3000 // Default cooldown for other commands
  },
  
  // Channel restrictions
  allowedChannels: {
    awaken: 'bot-spam',
    giveaway: '1376982644939821229'
  },
  
  // Emoji definitions
  emojis: {
    // General
    ping: '<:ping:1326194149808144425>',
    gopnik: '<:gopnik:1325482731551068170>',
    hp: '<:hp:1325816948889747456>',
    
    // Star Expedition
    se1g: '<a:se1g:1353437489708269628>',
    se2g: '<a:se2g:1349453030025859123>',
    
    // Destiny Temple
    origin: '<:origin:1332021165073367060>',
    surge: '<:surge:1332021150586245140>',
    chaos: '<:chaos:1332021096110755975>',
    core: '<:core:1332021073977278544>',
    polystar: '<:polystar:1332021054763303053>',
    nirvana: '<:nirvana:1332021038044676096>',
    gem: '<:auroragem:1332031851048472627>',
    spiritvein: '<:spiritvein:1333082447772123146>',
    bag: '<:bag:1333083225244827698>',
    csg: '<:csg:1338159695227129956>',
    
    // Awakenings
    awakene: '<:awakene:1328071268146085969>',
    awakend: '<:awakend:1328071247384416286>',
    awakensss: '<:awakensss:1329829693968613428>'
  },
  
  // API Keys and IDs should be in .env file, not here
  // This is just for reference
  requiredEnvVars: [
    'TOKEN',
    'GEMINI_API_KEY',
    'SERVER_ID'
  ]
};