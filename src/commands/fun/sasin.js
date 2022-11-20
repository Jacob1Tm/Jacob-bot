const Discord = require('discord.js')
module.exports = {
    name: 'sasin',
    description: 'Liczy ile sasinów to dana liczba',
    usage: '[liczba]',
    category: 'fun',
    cooldown: 5,
    execute(message, args) {
    const liczba = args[0]
        const embed2 = new Discord.MessageEmbed()
        embed2.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        embed2.setColor("RED")
        embed2.setDescription(`:x: **${liczba}** nie jest liczbą`)
        const embed3 = new Discord.MessageEmbed()
        embed3.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        embed3.setColor("RED")
        embed3.setDescription(':x: Musisz podać liczbę')
        if(!args[0]) return  message.channel.send({ embeds: [embed3]})
        if(isNaN(liczba)) return message.channel.send({ embeds: [embed2]})
        if (liczba < 1) {message.channel.send({ embeds: [embed2]})}
        if (liczba > 0) {
        const embed1 = new Discord.MessageEmbed()
            const sasined = liczba / 7000000
        embed1.setTitle(`${liczba} jest równe`)
        embed1.setDescription(`${sasined.toFixed(10)} sasin(a/ów)`)
        embed1.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            embed1.setColor("GREEN")
            message.channel.send({ embeds: [embed1]})
    }},
};
