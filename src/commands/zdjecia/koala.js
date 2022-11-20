const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'koala',
	description: 'Wyswietla losowe zdjecie koali',
    category: 'zdj',
	execute(message) {
    axios.get ('https://some-random-api.ml/animal/koala')
    .then((res) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Losowe zdjecie koali')
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