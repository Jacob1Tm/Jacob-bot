const commandHandler = require("./command-handler");
const slashHandler = require("./slash-handler");
const deploycommand = require("./deploy-commands");
const eventHandler = require("./event-handler")
const { Client, Intents } = require('discord.js');
const { token } = require('./config.js');
const config = require('./config.js')
const mongoose = require("mongoose")
global.owner = config.ownerID
global.gprefix = config.prefix
global.v = config.version
global.customstatus = false;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const {Player} = require("discord-music-player");
client.player = new Player(client, {deafenOnJoin: true, timeout: 30000});
commandHandler(client, config);
slashHandler(client, config);
deploycommand(client, config);
eventHandler(client)

//łączymy się z bazą danych
mongoose.connect(config.mongo, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log("Połączono z baza danych");
		global.databaseonline = true;
	})
	.catch((err) => {
		console.log("Nie udało się połączyć z bazą danych, wszystkie rzeczy korzystające z bazy danych nie działają lub są zmodyfikowane do działania bez.\n(ale jestem pro w opisywaniu)")
		global.databaseonline = false;
	});

//logujemy na konto bota xD
client.login(token);
