const Discord = require('discord.js');
const prettyMilliseconds = require("pretty-ms");
const paczka = require("../../../package.json");
const djs = paczka.dependencies["discord.js"];
module.exports = {
    name: "info",
    description: "Wysyła podstawowe informacje o bocie.",
    execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
        embed.setColor('RANDOM');
        embed.setTitle(`Cześć jestem ${client.user.username}! Oto kilka informacji o mnie:`);
        embed.setAuthor(client.user.tag, client.user.displayAvatarURL());
        const usage = process.memoryUsage().rss / 1024 / 1024
        embed.addFields(
            { name: 'Użycie ramu', value: `${usage.toFixed(2)}MB`, inline:true },
            { name: 'Uptime', value: `${prettyMilliseconds(client.uptime)}`, inline:true },
            { name: 'Ping', value: `${client.ws.ping}ms`, inline: true },
            { name: 'Wersja Discord.JS', value: `v${djs.slice(1)}`, inline: true },
            { name: 'Wersja Node.JS', value: process.version, inline: true },
            { name: 'Wersja bota', value: `v${global.v}`, inline: true },
            { name: 'Twórca bota', value: `${client.users.cache.get(global.owner).tag}`, inline: false},
        );
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send({embeds: [embed]});
    }
}
