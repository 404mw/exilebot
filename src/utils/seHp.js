const sehpValues = {
  1: 1.3874994037272e19,
  2: 7.5643961301023e18,
  3: 7.4751573156657e18,
  4: 7.4222456077545e18,
  5: 7.282631267724e18,
  6: 7.21392667974e18,
  7: 7.1671325015866e18,
  8: 7.08025675793e18,
  9: 7.007812915737e18,
  10: 6.8446772208676e18,
  11: 6.775685648135e18,
  12: 6.4879882739397e18,
  13: 6.2139397618129e18,
  14: 5.8732557413524e18,
  15: 5.5126886044477e18,
  16: 5.1753533353782e18,
  17: 4.8092836245477e18,
  18: 4.4657631858819e18,
  19: 4.0500263730452e18,
  20: 3.8140122516553e18,
  21: 3.4524592437273e18,
  22: 3.2634416005155e18,
  23: 3.0916815265632e18,
  24: 2.9199214526109e18,
  25: 2.7217007562079e18,
  26: 2.4919251958755e18,
  27: 2.3533509271011e18,
  28: 2.2124847328096e18,
  29: 2.0611210828494e18,
  30: 1.8643579390079e18,
  31: 1.7176009349297e18,
  32: 1.6317237801699e18,
  33: 1.5004041854406e18,
  34: 1.4599630440132e18,
  35: 1.3740826759374e18,
  36: 1.2882023078616e18,
  37: 1.1992515717209e18,
  38: 1.0694266148429e18,
  39: 1.0229150932364e18,
  40: 9.446808355482e17,
  41: 8.361179731416e17,
  42: 8.158604440998e17,
  43: 7.6732876687031e17,
  44: 7.298803873495e17,
  45: 6.8613219797322e17,
  46: 6.4739107650153e17,
  47: 6.011603272317e17,
  48: 5.6024596642299e17,
  49: 5.0827978557012e17,
  50: 4.723402571088e17,
  51: 4.3893230597904e17,
  52: 4.0373009542923e17,
  53: 3.8614367487949e17,
  54: 3.6499019867526e17,
  55: 3.4352018698845e17,
  56: 3.2205017530164e17,
  57: 3.0058016361433e17,
  58: 2.8017495198688e17,
  59: 2.5764014028121e17,
  60: 2.361701285544e17,
  61: 2.1470011686759e17,
  62: 2.039651110224e17,
  63: 1.9323010517925e17,
  64: 1.824950993361e17,
  65: 1.7166368384658e17,
  66: 1.610250876498e17,
  67: 1.5029008180665e17,
  68: 1.395550759635e17,
  69: 1.2882007012035e17,
  70: 1.180850642772e17,
  71: 1.0735005842405e17,
  72: 1.0257894472587e17,
  73: 9.780783101763e16,
  74: 9.303671720951e16,
  75: 8.826562360133e16,
  76: 8.349443989315e16,
  77: 7.8357889927411e16,
  78: 7.395226247679e16,
  79: 6.918114876861e16,
  80: 6.441003506083e16,
  81: 5.367502921677e16,
  82: 5.0981277756059e16,
  83: 4.8307526295246e16,
  84: 4.5623774834382e16,
  85: 4.2940023373518e16,
  86: 4.0256271912705e16,
  87: 3.7572520451841e16,
  88: 3.4888768990977e16,
  89: 3.3815268406662e16,
  90: 3.2205017530164e16,
  91: 2.6837514608436e16,
  92: 2.6390222698326e16,
  93: 2.5923308973292e16,
  94: 2.5679617168065e16,
  95: 2.5552409083625e16,
  96: 2.4601055057733e16,
  97: 2.4153763147623e16,
  98: 2.4011100655347e16,
  99: 2.3259179327352e16,
  100: 8.712136513956e15,
  101: 1.797938070173e18,
  102: 1.797938070173e18,
  103: 8.989690350865e17,
  104: 4.4948451754186e17,
  105: 2.2874225877093e17,
  106: 1.1237112938546e17,
  107: 5.6185564692732e16,
  108: 2.8092782246366e16,
  109: 1.4046391173183e16,
  110: 7023195586591500,
  111: 4.682130391061e28,
  112: 3.121420260719e28,
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
  200: 10250000000,
};

module.exports = sehpValues;