const Discord = require('discord.js')
const owoify = require('owoify-js').default
module.exports = {
	name: 'owoify',
	description: `zmienia tekst na zjebany użycie: ${global.prefix}owoify (owo,uwu,uvu) [tekst]`,
	cooldown: 5,
	category: 'fun',
	args: true,
	aliases: ['uwu', 'owo', 'uvu'],
	usage: "<owo/uwu/uvu> <tekst>",
	execute(message, args) {
		const embed = new Discord.MessageEmbed()
			.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
		const tekst = args.slice(1).join(' ');
		if (args[0] === "owo") {
			embed.setTitle('owo')
			embed.setDescription(owoify(tekst,))
			embed.setColor('#37ff00');
			message.channel.send({ embeds: [embed]})
		}
		else if (args[0] === "uwu") {
			embed.setTitle('uwu')
			embed.setDescription(owoify(tekst, 'uwu'))
			embed.setColor('#37ff00');
			message.channel.send({ embeds: [embed]})
		}
		else if (args[0] === "uvu") {
			embed.setTitle('uvu')
			embed.setDescription(owoify(tekst, 'uvu'))
			embed.setColor('#37ff00');
			message.channel.send({ embeds: [embed]})
		}
		else {
			embed.setDescription(':x: musisz podać poprawny argument **owo uwu lub uvu**')
			embed.setColor('#ff0000');
			message.channel.send({ embeds: [embed]})
		}

	}
};