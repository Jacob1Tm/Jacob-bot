const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'lis',
    aliases: ['lisu', 'liseł'],
	description: 'Wyswietla losowe zdjecie lisa',
    category: 'zdj',
	execute(message) {
    axios.get ('https://some-random-api.ml/animal/fox')
    .then((res) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Losowe zdjecie lisa')
        .setImage(`${res.data.image}`)
        .setColor("RANDOM")
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send({embeds: [embed]})
    })
    .catch(() => {
        console.error('ERR:', err)
    })
    }


}