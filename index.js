const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./src/config.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, client => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.login(token);
