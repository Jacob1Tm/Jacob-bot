const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'hug',
    description: 'Przytula oznaczoną osobę',
    category: 'zdj',
    aliases: ['przytulas', 'tuli', 'tulas'],
    execute(message, args) {
        axios.get ('https://some-random-api.ml/animu/hug')
            .then((res) => {
                if (!message.mentions.users.first() && !args[0]) return message.channel.send({content:"Kogo chcesz przytulić?"})
                if (!message.mentions.users.first() && args[0]) return message.channel.send({content:"Niestety jestem debilem i nie umiem zrobić aby po id działało lub na osobach które nie są na serwerze :("})
                const link = res.data.link
                const osoba = message.mentions.users.first()
                if (osoba.tag === message.author.tag) return message.channel.send({content:'No niestety to tak nie działa nie możesz samego siebie głaskać :('})
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.tag} przytula ${osoba.tag}`)
                    .setImage(link)
                    .setColor("RANDOM")
                embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({embeds: [embed]})
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
}