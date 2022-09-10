const fs = require("fs");
const ascii = require("ascii-table");

module.exports = (client) => {
    const fs = require("fs");
    const {Collection} = require('discord.js')
    client.slashcommands = new Collection();
    //const commandFiles = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));

    const commandFolders = fs.readdirSync('./slashcommands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./slashcommands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./slashcommands/${folder}/${file}`);
            client.slashcommands.set(command.data.name, command)
        }
    }

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const command = client.slashcommands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'Wystąpił Błąd!', ephemeral: true});
        }
    })
}