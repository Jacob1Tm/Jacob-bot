const Discord = require('discord.js')
module.exports = {
    name: 'invite',
    description: 'Wysyła link z zaproszeniem bota',
    category: 'fun',
    execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        embed.setDescription(`Dodaj bota na swój serwer\n[Link](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=269872375&scope=bot+applications.commands)`)
        message.channel.send({embeds: [embed]})
    },
};
