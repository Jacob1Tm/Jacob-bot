const { Client, Events, GatewayIntentBits, Collection} = require('discord.js');
const { token } = require('./src/config.js');
const slashHandler = require('./src/handlers/slashHandler.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

slashHandler(client, Collection, Events);

client.once(Events.ClientReady, client => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.login(token);
