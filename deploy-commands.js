const fs = require("fs");
const {Routes} = require("discord-api-types/v9");
const config = require("./config");
module.exports = () => {
	const {REST} = require('@discordjs/rest');
	const {Routes} = require('discord-api-types/v9');
	const {token} = require('./config.js');
	const fs = require('node:fs');
	const config = require('./config.js')

	const commands = [];
	const guildcommands = [];

	const commandFolders = fs.readdirSync('./slashcommands');

	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`./slashcommands/${folder}`).filter(file => file.endsWith('.js'));
		if (folder == 'developer' || folder == 'indev') {
			for (const file of commandFiles) {
				const command = require(`./slashcommands/${folder}/${file}`);
				guildcommands.push(command.data.toJSON());
			}
		} else {
		for (const file of commandFiles) {
			const command = require(`./slashcommands/${folder}/${file}`);
			commands.push(command.data.toJSON());
		}}
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
		try {
			await rest.put(
				Routes.applicationGuildCommands(config.clientId, config.guildId),
				{body: guildcommands},
			);
			console.log('Pomyślnie Odświeżono slash komendy serwerowe!');
		} catch (error) {
			console.error(error);
		};
	})()};
