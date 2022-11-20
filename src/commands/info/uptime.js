const prettyMilliseconds = require("pretty-ms");
const Discord = require("discord.js")
module.exports = {
	name: 'uptime',
	description: 'Pokazuje ile czasu bot jest online',
    category: 'info',
	execute(message, args, client) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle('Bot jest online od:')
        embed.setDescription(`${prettyMilliseconds(client.uptime)}`)
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        message.channel.send({embeds: [embed]})
	},
};