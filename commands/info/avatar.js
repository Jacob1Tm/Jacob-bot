const discord = require('discord.js')
module.exports = {
	name: 'awatar',
	description: 'wysyła twój lub osoby oznaczonej awatar',
	aliases: ['icon', 'pfp'],
	category: 'info',
	execute(message) {
		const embed = new discord.MessageEmbed()
		embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
		embed.setColor("RANDOM")
		if (!message.mentions.users.size) {
			embed.setDescription('Twój awatar')
			embed.setImage(message.author.displayAvatarURL({ dynamic: true }))
			message.channel.send({embeds: [embed]})
		}

		const user = message.mentions.users.first();
			embed.setDescription(`Awatar użytkownika ${user.username}`)
			embed.setImage(user.displayAvatarURL({ dynamic: true })
		);
		message.channel.send({embeds: [embed]});
	},
};
