// Based on https://github.com/discordjs/guide/blob/main/code-samples/creating-your-bot/command-deployment/deploy-commands.js <3

const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./../config.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const devCommands = [];
const foldersPath = path.join(__dirname, '..', 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command && !commandsPath.includes('dev')) {
			commands.push(command.data.toJSON());
		} else if ('data' in command && 'execute' in command && commandsPath.includes('dev')) {
			devCommands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);

		console.log(`Started refreshing ${devCommands.length} development (/) commands.`);

		const devData = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: devCommands },
		);

		console.log(`Successfully reloaded ${devData.length} development (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
