const wrola = '785997041478008863';
const wkanal = '828706872537251912';
const jrola = "961979130667225121";
const jkanal = "961979130679812133";
const Discord = require("discord.js")

module.exports = {
	name: 'weryfikacja',
	description: 'Ping!',
	execute(message, args) {
		const embed = new Discord.MessageEmbed();
        embed.setDescription('Zostałeś pomyślnie zweryfikowany!')
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)

		if (message.guild.id === "732581557826617395") {
		if(message.channel.id !== wkanal) return;
		message.channel.send({embeds: [embed]}).then(m => {
			message.member.roles.add(wrola);
			setTimeout(() => {
			  m.delete();
			  message.delete();
			}, 5000)
		})
	}
		else if (message.guild.id === "961979130667225118") {
			if(message.channel.id !== jkanal) return;
			message.channel.send({embeds: [embed]}).then(m => {
				message.member.roles.add(jrola);
				setTimeout(() => {
					m.delete();
					message.delete();
				}, 5000)
			})
		}
}}