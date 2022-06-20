const { Guild, GuildMember, DiscordAPIError } = require("discord.js");
const rola = '949803824388902912'
const kanal = '949805663217942560'
const Discord = require("discord.js")

module.exports = {
	name: 'verify',
	description: 'Ping!',
	execute(message, args) {
		const embed = new Discord.MessageEmbed();
        embed.setDescription('You have been successfully verified!')
        embed.setFooter(`Command Executed by ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
		if(message.channel.id !== kanal) return;
		message.channel.send({embeds: [embed]}).then(m => {
			message.member.roles.add(rola);
			setTimeout(() => {
			  m.delete();
			  message.delete();
			}, 5000)
		})
	}
}