const {randomStatus} = require("../../funkcje");
const ascii = require("ascii-table");
const fs = require("fs");
module.exports = {
    name: 'ready',
    execute(client) {

        const commandFolders = fs.readdirSync('./src/commands');

        const table = new ascii().setHeading("Komenda", "Folder", "Status").setBorder("│", "─");
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith(".js"));

            for (const file of commandFiles) {
                const commandName = require(`../../commands/${folder}/${file}`);
                client.commands.set(commandName.name, commandName);
                if (!commandName.name) table.addRow("-", folder, "❌");
                else table.addRow(commandName.name, folder, "✅");
            }
        }
        console.log(table.toString());

        console.log(`${client.user.tag} włączony!`);
        client.user.setActivity(`Dzień dobry! | Wersja ${global.v}`, { type: "PLAYING" });
        setInterval(() => {
            if (global.customstatus === false) {
                randomStatus(client);
            }}, 600000);
    }
}
