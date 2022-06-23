const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'credits',
    aliases: ['thx', 'podziekowania', 'podziękowania'],
    category: 'info',
    description: 'Lista osób które pomogły w tworzeniu bota',
    execute(message, args, client) {
        const jacobtm = client.users.cache.get("302872992097107991");
        const kubson = client.users.cache.get("404217213873029120");
        const embed = new MessageEmbed();
        embed.setTitle("Podziekowania");
        embed.setColor("RANDOM");
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        embed.addFields(
            {name: `${jacobtm.tag}`, value: "Generalnie pisał kod, największy noob tutaj.", inline: true},
            {name: `${kubson.tag}`, value: "Uczył mnie robić boty w js, bardzo często pomagał w różnych problemach, przepisał kompletnie komendę status.", inline: true},
            {name: "Arab", value: "Babar\nNie wiem szpul chciał", inline: true},
            {name: "** **", value: "** **"},
            {name: "Pomagałeś a nie ma cię na liście?", value: "Napisz do mnie na pw lub stwórz issue na githubie ewentualnie dodaj sam i zrób pull requesta."}

        )
        message.channel.send({embeds: [embed]});
    }
}