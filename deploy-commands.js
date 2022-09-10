const fs = require("fs");
module.exports = () => {
	const {REST} = require('@discordjs/rest');
	const {Routes} = require('discord-api-types/v9');
	const {token} = require('./config.js');
	const fs = require('node:fs');
	const config = require('./config.js')

	const commands = [];

	/*const commandFiles = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./slashcommands/${file}`);
		commands.push(command.data.toJSON());
	}*/

	const commandFolders = fs.readdirSync('./slashcommands');

	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`./slashcommands/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`./slashcommands/${folder}/${file}`);
			commands.push(command.data.toJSON());
		}
	}


	const rest = new REST({version: '9'}).setToken(token);

	(async () => {
		try {
			await rest.put(
				Routes.applicationCommands(config.clientId),
				{body: commands},
			);

			console.log('Pomyślnie Odświeżono globalne slash komendy!');
		} catch (error) {
			console.error(error);
		}
	})()};