const Discord = require("discord.js")
module.exports = {
	name: 'purge',
	description: 'Czyści wybraną ilość wiadomości!',
  category: 'moderacja',
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_MESSAGES"],
    guildOnly: true,
	execute(message, args) {
        const liczba = args[0]
		const embed = new Discord.MessageEmbed()
    embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        const embed2 = new Discord.MessageEmbed()
        embed2.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        embed.setDescription(":x: " + " Wpisz jakąś liczbę wiadomości do usunięcia")
        embed2.setDescription(`:x: **${args[0]}** nie jest liczbą`)
        if(!args[0]) return message.channel.send({embeds: [embed]})
        if(isNaN(args[0])) return message.channel.send({embeds: [embed2]})
        if(args[0] > 100 || args[0] < 2) {
            embed.setDescription(":x: " + " Błąd, możesz usuwać tylko liczby między 2 a 100 na raz!")
            message.channel.send({embeds: [embed]})
        } else {
            message.channel.messages.fetch({limit: Number(liczba) + 1}).then(messages => message.channel.bulkDelete(messages, true));
            embed.setDescription(`:white_check_mark: ${liczba} wiadomości zostały usunięte`)
            message.channel.send({embeds: [embed]})
        }
    }}