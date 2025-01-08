const {Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const token = process.env.TOKEN;

const sehpValues = {
    1: 1.3874994037272E+19,
    2: 7.5643961301023E+18,
    3: 7.4751573156657E+18,
    4: 7.4222456077545E+18,
    5: 7.2826312677240E+18, 
    6: 7.2139266797400E+18, 
    7: 7.1671325015866E+18, 
    8: 7.0802567579300E+18, 
    9: 7.0078129157370E+18, 
    10: 6.8446772208676E+18, 
    11: 6.7756856481350E+18, 
    12: 6.4879882739397E+18, 
    13: 6.2139397618129E+18, 
    14: 5.8732557413524E+18, 
    15: 5.5126886044477E+18, 
    16: 5.1753533353782E+18, 
    17: 4.8092836245477E+18, 
    18: 4.4657631858819E+18, 
    19: 4.0500263730452E+18, 
    20: 3.8140122516553E+18, 
    21: 3.4524592437273E+18, 
    22: 3.2634416005155E+18, 
    23: 3.0916815265632E+18, 
    24: 2.9199214526109E+18, 
    25: 2.7217007562079E+18, 
    26: 2.4919251958755E+18, 
    27: 2.3533509271011E+18, 
    28: 2.2124847328096E+18, 
    29: 2.0611210828494E+18, 
    30: 1.8643579390079E+18, 
    31: 1.7176009349297E+18, 
    32: 1.6317237801699E+18, 
    33: 1.5004041854406E+18, 
    34: 1.4599630440132E+18, 
    35: 1.3740826759374E+18, 
    36: 1.2882023078616E+18, 
    37: 1.1992515717209E+18, 
    38: 1.0694266148429E+18, 
    39: 1.0229150932364E+18, 
    40: 9.4468083554820E+17, 
    41: 8.3611797314160E+17, 
    42: 8.1586044409980E+17, 
    43: 7.6732876687031E+17, 
    44: 7.2988038734950E+17, 
    45: 6.8613219797322E+17, 
    46: 6.4739107650153E+17, 
    47: 6.0116032723170E+17, 
    48: 5.6024596642299E+17, 
    49: 5.0827978557012E+17, 
    50: 4.7234025710880E+17, 
    51: 4.3893230597904E+17,
    52: 4.0373009542923E+17,
    53: 3.8614367487949E+17,
    54: 3.6499019867526E+17,
    55: 3.4352018698845E+17,
    56: 3.2205017530164E+17,
    57: 3.0058016361433E+17,
    58: 2.8017495198688E+17,
    59: 2.5764014028121E+17,
    60: 2.3617012855440E+17,
    61: 2.1470011686759E+17,
    62: 2.0396511102240E+17,
    63: 1.9323010517925E+17,
    64: 1.8249509933610E+17,
    65: 1.7166368384658E+17,
    66: 1.6102508764980E+17,
    67: 1.5029008180665E+17,
    68: 1.3955507596350E+17,
    69: 1.2882007012035E+17,
    70: 1.1808506427720E+17,
    71: 1.0735005842405E+17,
    72: 1.0257894472587E+17,
    73: 9.7807831017630E+16,
    74: 9.3036717209510E+16,
    75: 8.8265623601330E+16,
    76: 8.3494439893150E+16,
    77: 7.8357889927411E+16,
    78: 7.3952262476790E+16,
    79: 6.9181148768610E+16,
    80: 6.4410035060830E+16,
    81: 5.3675029216770E+16,
    82: 5.0981277756059E+16,
    83: 4.8307526295246E+16,
    84: 4.5623774834382E+16,
    85: 4.2940023373518E+16,
    86: 4.0256271912705E+16,
    87: 3.7572520451841E+16,
    88: 3.4888768990977E+16,
    89: 3.3815268406662E+16,
    90: 3.2205017530164E+16,
    91: 2.6837514608436E+16,
    92: 2.6390222698326E+16,
    93: 2.5923308973292E+16,
    94: 2.5679617168065E+16,
    95: 2.5552409083625E+16,
    96: 2.4601055057733E+16,
    97: 2.4153763147623E+16,
    98: 2.4011100655347E+16,
    99: 2.3259179327352E+16,
    100: 8.7121365139560E+15,   
  };

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]})

    client.on('messageCreate', (message) => {
        
        if (message.author.bot) return; // Ignoring messages from the bot
        else if (message.author.username === `neky96` && message.content.toLowerCase().startsWith(`!se`))
          return (
            message.reply(`only works for true exile members`),
            message.channel.send(`<:poorneky:1326196181579333714>`)
          )
      
        else if (message.content.toLowerCase().startsWith('!se')) { // triggeres the command at !se
          const args = message.content.split(' '); // splitting with spaces
      
          if (args.length !== 3) { // Ensuring there are exactly three parts: command, input1, input2
            return message.reply('> Follow the correct pattern you **dumbass**');
          }
          
          // converting strings into numbers to do calcs later
          const input1 = parseInt(args[1], 10); 
          const input2 = parseInt(args[2], 10);
      
          // confirming if both values are numbers
          if (isNaN(input1) || isNaN(input2)) {
            return message.reply('> Values must be in numbers.');
          }
      
          // Checking if the first input exists/defined
          if (!sehpValues.hasOwnProperty(input1)) {
            return message.reply(`> only **1-100** available for now`);
          }

        // checking if the second input is written correctly
          if (input2 > 100) {
            return message.reply(`> **100% is always max fuckface**`);
          }
          if (input2 < 1) {
            return message.reply(`> hunh!!! really??`)
          }
      
          const predefinedValue = sehpValues[input1];
      
          // Performing percentage-based calculation
          const result = (predefinedValue * input2) / 100;

          // Converting the result to desired format
          let exponentialResult = result.toExponential(13);
      
          // Sending the result back as a reply
          message.reply(`> **x${input1}** <:hp:1325816948889747456>\n > __${exponentialResult}__ remaining`);
        }

        else if (message.content.toLowerCase().startsWith(`!kongen`)) {
          return message.reply(`https://tenor.com/view/kim-jong-un-gif-6119244402377892028`)
        }
        else if (message.content.toLowerCase().startsWith(`!adrian`)) {
          return message.reply(`https://tenor.com/view/mckinley-whale-big-gif-3873017581534036627`)
        }
        else if (message.content.toLowerCase().startsWith(`!peitho`)) {
          return message.reply(`https://tenor.com/view/uncle-roger-weak-gif-19541923`)
        }
        else if (message.content.toLowerCase().startsWith(`!blank`)) {
          return message.reply(`<:blank:1326590365062660187> \n <:blank:1326590365062660187> \n <:blank:1326590365062660187> \n <:blank:1326590365062660187> \n <:blank:1326590365062660187>`)
        }
        else if (message.content.toLowerCase().startsWith(`!patar`)) {
          return message.reply(`https://tenor.com/view/yahia-potato-dance-gif-16070760`)
        }
        else if (message.content.toLowerCase().startsWith(`!fold`)) {
          const fold = [
            "https://tenor.com/view/samsung-samsung-galaxy-samsung-galaxy-z-samsung-galaxy-z-fold-samsung-galaxy-z-fold-6-gif-17233388516951825573",
            "https://tenor.com/view/samsung-samsung-galaxy-samsung-galaxy-z-samsung-galaxy-z-fold-samsung-galaxy-z-fold-5-gif-8796314290296609501",
            "https://tenor.com/view/samsung-samsung-galaxy-samsung-galaxy-z-samsung-galaxy-z-fold-samsung-galaxy-z-fold3-gif-22713805",
            "https://tenor.com/view/samsung-samsung-galaxy-samsung-galaxy-z-samsung-galaxy-z-fold-samsung-galaxy-z-fold-6-gif-16899636265295383040",
            "https://tenor.com/view/samsung-samsung-galaxy-samsung-galaxy-z-samsung-galaxy-z-fold-samsung-galaxy-z-fold4-gif-26471633"]
            
            const result = Math.floor(Math.random() * fold.length)
          return message.reply(fold[result])
        }
        else if (message.content.toLowerCase().startsWith(`!mapi`)) {
          const mapi = [
            "https://tenor.com/view/johnny-bravo-muscles-pec-bounce-pecs-biceps-gif-17958622974887416284",
            "https://tenor.com/view/pec-bounce-pecs-chest-bouncing-gif-20318718",
            "https://tenor.com/view/muscle-man-gif-20456077"]
            
            const result = Math.floor(Math.random() * mapi.length)
          return message.reply(mapi[result])
        }
        else if (message.content.toLowerCase().startsWith(`!neky`)) {
          const neky = [
            "https://tenor.com/view/small-tiny-little-too-small-not-huge-gif-25307813",
            "https://tenor.com/view/south-park-so-small-gif-14287965",
            "https://tenor.com/view/magnifying-glass-cant-see-tiny-where-is-it-small-gif-23452184",
            "https://tenor.com/view/search-yes-okey-magnifying-glass-gif-10889149"]
            
            const result = Math.floor(Math.random() * neky.length)
          return message.reply(neky[result])
        }
        else if (message.content.toLowerCase().startsWith(`!jaz`)) {
          return message.reply(`https://tenor.com/view/baby-girl-gif-19510561`)
        }
        else if (message.content.toLowerCase().startsWith(`!daddy`)) {
          return message.reply(`https://tenor.com/view/obese-boy-obesity-overhang-fat-belly-fat-guy-gif-9772974852016550463`)
        }
        else if (message.content.toLowerCase().startsWith(`!classic`)) {
          return message.reply(`https://tenor.com/view/crazy-cat-lady-agnes-loonstra-illustration-cat-cat-mom-gif-13715924`)
        }
        else if (message.content.toLowerCase().startsWith(`!dab`)) {
          return message.reply(`https://tenor.com/view/habibi-dubai-arabmoney-habibimoney-rrc-gif-26503509`)
        }
        else if (message.content.toLowerCase().startsWith(`!james`)) {
          return message.reply(`https://tenor.com/view/racist-point-smile-gif-16693098`)
        }
        else if (message.content.toLowerCase().startsWith(`!wick`)) {
          return message.reply(`https://tenor.com/view/disney-gif-9635069`)
        }
        else if (message.content.toLowerCase().startsWith('!ping')) {
          const sentTime = Date.now(); // Capture the timestamp when the bot processes the command
        
          message.reply('Pong! 🏓')
            .then((replyMessage) => {
              const responseTime = Date.now() - sentTime; // Calculate response time
              const websocketPing = Math.round(client.ws.ping); // Get WebSocket ping
        
              // Format response time to one decimal place
              const formattedResponseTime = (responseTime / 100).toFixed();
        
              replyMessage.edit(`Pong! 🏓 \n **${formattedResponseTime}s**`);
            })
        }
        
        
        
        

        else if (message.mentions.has(client.user)) {
          message.react(`<:ping:1326194149808144425>`)
        }

        
      });

    client.on('interactionCreate', (interaction) => {
        if (!interaction.isCommand()) return;

        if (interaction.commandName === 'help') {
          const embed = new EmbedBuilder()
            .setColor(0x0099ff) // Set a color for the embed
            .setTitle('Bot Help')
            .setDescription('Here’s how to use the bot:')
            .addFields(
              { name: '/help', value: 'Show this help message.' },
            )
            .setFooter({ text: 'Thank you for using the bot!', iconURL: client.user.displayAvatarURL() });
      
          return interaction.reply({ embeds: [embed] });
        }
      });
      


client.login(token)