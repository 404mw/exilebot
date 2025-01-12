const {Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
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
    101: 1.797938070173e+18,
    102: 1.797938070173e+18,
    103: 8.989690350865e+17,
    104: 4.4948451754186e+17,
    105: 2.2874225877093e+17,
    106: 1.1237112938546e+17,
    107: 5.6185564692732e+16,
    108: 2.8092782246366e+16,
    109: 1.4046391173183e+16,
    110: 7023195586591500,
    111: 4.682130391061e+28,
    112: 3.121420260719e+28,
    113: 2080946840479300,
    114: 1387297893651500,
    115: 924865262434320,
    116: 6.16576841622886,
    117: 411051227748590,
    118: 274034151832390,
    119: 182689434554790,
    120: 121792956369860,
    121: 101494130307770,
    122: 84578441923138,
    123: 70482034935948,
    124: 58735029113290,
    125: 48945857594340,
    126: 40788214661950,
    127: 33990178884972,
    128: 28325149070810,
    129: 23604290892410,
    130: 19670242410410,
    131: 16391868675410,
    132: 13659890562830,
    133: 12418082329846,
    134: 11289165754405,
    135: 10262877958550,
    136: 9329889053190,
    137: 8481717320970,
    138: 7710652110010,
    139: 7009683736410,
    140: 6372439760410,
    141: 5793127055030,
    142: 5266479140750,
    143: 5015694419840,
    144: 4776851828380,
    145: 4549382693541,
    146: 4332745422420,
    147: 4126424211914,
    148: 3929927820870,
    149: 3742788400584,
    150: 3564560381509,
    151: 3394819411040,
    152: 3233161433750,
    153: 3079201279840,
    154: 2792572647330,
    155: 2792926330810,
    156: 2659929838730,
    157: 2533266512920,
    158: 2412634774190,
    159: 2297747404010,
    160: 2188330861030,
    161: 2084124629639,
    162: 1894658754330,
    163: 1722417049540,
    164: 1655333681400,
    165: 1423845164760,
    166: 1294077422360,
    167: 1176444020970,
    168: 1069485473140,
    169: 972259520850,
    170: 88387291570,
    171: 818400269790,
    172: 757778027720,
    173: 701646322130,
    174: 649672520430,
    175: 601548630210,
    176: 556989472280,
    177: 515730992700,
    178: 477528696990,
    179: 442156200779,
    180: 409403389520,
    181: 379077675360,
    182: 354278201340,
    183: 331101122470,
    184: 309440301630,
    185: 289196435410,
    186: 272826927709,
    187: 257383893950,
    188: 242814994180,
    189: 231252375440,
    190: 220430357640,
    191: 211769754780,
    192: 203624591040,
    193: 199631952000,
    194: 195717600000,
    195: 191880000000,
    196: 159900000000,
    197: 123000000000,
    198: 82000000000,
    199: 41000000000,
    200: 10250000000   
  };

function getRandomAnswer(pool) {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (const { answer, probability } of pool) {
    cumulativeProbability += probability;
    if (random < cumulativeProbability) {
      return answer;
    }
  }

  return null; // Fallback (in case of an error)
}

function runMultipleSelections(pool, iterations) {
  const results = {};

  // Initialize result counter for each answer
  pool.forEach(({ answer }) => {
    results[answer] = 0;
  });

  // Perform the selection multiple times
  for (let i = 0; i < iterations; i++) {
    const result = getRandomAnswer(pool);
    results[result] += 1;
  }

  return results;
}

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
            return message.reply(`> Sending DH a mail to add **${input1}**`);
          }

        // checking if the second input is written correctly
          if (input2 > 100) {
            return message.reply(`> **100% is always max fuckface**`);
          }
          if (input2 < 1) {
            return (
              message.reply(`> Really?? ${input2}`),
              message.channel.send(`<:stare:1326950087326171168>`)
            )
          }
      
          const predefinedValue = sehpValues[input1];
      
          // Performing percentage-based calculation
          const result = (predefinedValue * input2) / 100;

          // Converting the result to desired format
          let exponentialResult = result.toExponential(13);
      
          // Sending the result back as a reply
          message.reply(`> **x${input1}** <:hp:1325816948889747456>\n > **${exponentialResult}** remaining`);
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
        else if (message.content.toLowerCase().startsWith(`!pata` || `!xpata`)) {
          if (message.channel.id === '866773791560040519'){
            return message.reply(`https://tenor.com/view/pats-for-patrick-i%E2%80%99m-with-stupid-gif-5535083890257725800`);
          } else return message.reply(`https://tenor.com/view/yahia-potato-dance-gif-16070760`)
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
          return message.reply(`https://tenor.com/view/blaze-it-shaggy-smoke-scooby-doo-gif-5354085`)
        }
        else if (message.content.toLowerCase().startsWith(`!classic`)) {
          return message.reply(`https://tenor.com/view/crazy-cat-lady-agnes-loonstra-illustration-cat-cat-mom-gif-13715924`)
        }
        else if (message.content.toLowerCase().startsWith(`!hunor`)) {
          return message.reply(`https://tenor.com/view/jim-carrey-bye-liar-gif-27660461`)
        }
        else if (message.content.toLowerCase().startsWith(`!dab`)) {
          return message.reply(`https://tenor.com/view/habibi-wildin-meme-funny-arab-gif-19979166`)
        }
        else if (message.content.toLowerCase().startsWith(`!ctv`)) {
          return message.reply(`https://tenor.com/view/im-probably-the-best-in-the-world-hugs86-dig-deep-super-smash-bros-hugs-gif-21688184`)
        }
        else if (message.content.toLowerCase().startsWith(`!james`)) {
          return message.reply(`https://tenor.com/view/racist-point-smile-gif-16693098`)
        }
        else if (message.content.toLowerCase().startsWith(`!queen` || `queenie`)) {
          return message.reply(`https://tenor.com/view/spider-man-gif-21019143`)
        }
        else if (message.content.toLowerCase().startsWith(`!me`) && message.author.username === 'm.w.') {
          return message.reply(`https://tenor.com/view/drooling-slobber-spongebob-patrick-star-yummy-gif-13622877736389093652`)
        } 
        else if (message.content.toLowerCase().startsWith(`!mw`)){
          return message.reply(`https://tenor.com/view/homer-awkward-awkward-silence-what-whattt-gif-3271184098276575610`)
        }
        else if (message.content.toLowerCase().startsWith(`!wexon`)) {
          return message.reply(`https://tenor.com/view/solara-roblox-roblox-hacks-hacks-exploits-gif-3309607858158260586`)
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
        
              replyMessage.edit(`Pong! 🏓 \n **${formattedResponseTime}ms**`);
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
            .setColor(0x0099ff)
            .setTitle('__**Exile\'s own amazing bot**__')
            .setDescription('Here’s how to use it:')
            .addFields(
              { name: '/help', value: 'to show this help message.' },
              { name: '/se', value: 'To calculates Remaining HP of Star Expedition boss for you'}
            )
            .setThumbnail(client.user.displayAvatarURL() )
            
      
          return interaction.reply({ embeds: [embed] });
        }
        else if (interaction.commandName === 'se') {

            const input1 = interaction.options.getNumber('hp'); 
            const input2 = interaction.options.getNumber('percentage');

            const predefinedValue = sehpValues[input1];

            if (!input2) {
              let exponentialResult = predefinedValue.toExponential(13);
              return interaction.reply(`> **x${input1}** <:hp:1325816948889747456> at **100%**\n > \n > **${exponentialResult}**`);
            }
      
            const result = (predefinedValue * input2) / 100;

            let exponentialResult = result.toExponential(13);
        
           return interaction.reply(`> **x${input1}** <:hp:1325816948889747456> at **${input2}%**\n > \n > **${exponentialResult}** remaining`);
        }
        else if (interaction.commandName === 'awaken') {

          const allowedChannelId = '1328069031118377103';
          if (interaction.channelId !== allowedChannelId) {
            return interaction.reply({
              content: "This command can only be used in bot-spam channel.",
              ephemeral: true
            });
          }

          const pool = [
            { answer: "E-", probability: 0.043, emoji: `<:awakenem:1328076005197348984>` },
            { answer: "E", probability: 0.198, emoji: `<:awakene:1328071268146085969>` },
            { answer: "E+", probability: 0.288, emoji: `<:awakenep:1328076026110148739>` },
            { answer: "D-", probability: 0.200, emoji: `<:awakendm:1328075963699040389>` },
            { answer: "D", probability: 0.092, emoji: `<:awakend:1328071247384416286>` },
            { answer: "D+", probability: 0.048, emoji: `<:awakendp:1328075988877443073>` },
            { answer: "C-", probability: 0.044, emoji: "<:awakencm:1328075931754954772>" },
            { answer: "C", probability: 0.043, emoji: "<:awakenc:1328071228300197980>" },
            { answer: "C+", probability: 0.0213, emoji: "<:awakencp:1328075947437592676>" },
            { answer: "B-", probability: 0.0162, emoji: "<:awakenbm:1328076518412521564>" },
            { answer: "B", probability: 0.0055, emoji: "<:awakenb:1328071210860286124>" },
            { answer: "B+", probability: 0.000745, emoji: "<:awakenbp:1328076535055384757>" },
            { answer: "A-", probability: 0.00015, emoji: "<:awakenam:1328076470895116319>" },
            { answer: "A", probability: 0.000065, emoji: "<:awakena:1328071192753602600>" },
            { answer: "A+", probability: 0.000025, emoji: "<:awakenap:1328076502218313799>" },
            { answer: "S", probability: 0.000015, emoji: "<:awakens:1328071289763659949>" }
          ];

          const iterations = interaction.options.getNumber('times');
      
          const results = runMultipleSelections(pool, iterations);
      
          let reply = `You awakened **${iterations}** times:\n`;

          for (const [answer, count] of Object.entries(results)) {
          if (count > 0) {
            const poolItem = pool.find(item => item.answer === answer);
            reply += `${poolItem?.emoji} -> **${count}** times\n`;
          }}

           return interaction.reply(reply);
        }
      });
      


client.login(token)