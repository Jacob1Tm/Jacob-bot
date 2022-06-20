const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'kot',
    aliases: ['cat'],
	description: 'Wyswietla losowe zdjecie kota',
    category: 'zdj',
	execute(message) {

    axios.get ('https://some-random-api.ml/animal/cat')
    .then((res) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Losowe zdjecie kota')
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