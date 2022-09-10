const commandHandler = require("./command-handler");
const slashHandler = require("./slash-handler");
const deploycommand = require("./deploy-commands");
const { Client, Intents } = require('discord.js');
const { token } = require('./config.js');
const config = require('./config.js')
const mongoose = require("mongoose")
const {randomStatus} = require("./funkcje.js")
global.owner = config.ownerID
global.prefix = config.prefix
global.v = config.version
global.customstatus = false;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
commandHandler(client, config);
slashHandler(client, config);
deploycommand(client, config);

client.login(token);

let args = process.argv;
console.log(args);

let argsslicedby2 = args.slice(2);
console.log(argsslicedby2);

mongoose.connect(config.mongo, {
	useNewUrlParser: true,
	useUnifiedTopology: true,

})
	.then(() => {
		console.log("Połączono z baza danych")
		global.databaseonline = true;
	})
	.catch((err) => {
		console.log("Nie udało się połączyć z bazą danych, wszystkie rzeczy korzystające z bazy danych nie działają lub są zmodyfikowane do działania bez.\n(ale jestem pro w opisywaniu)")
		global.databaseonline = false;
	});

client.on("ready", async () => {
	console.log(`${client.user.tag} włączony!`);
	client.user.setActivity(`Dzień dobry! | Wersja ${global.v}`, { type: "PLAYING" });
		setInterval(() => {
			if (global.customstatus === false) {
				randomStatus(client);
			}}, 600000)});