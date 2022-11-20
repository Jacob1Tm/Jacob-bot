const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'panda',
    aliases: ['pandapieczlotych'],
	description: 'Wyswietla losowe zdjecie pandy',
    category: 'zdj',
	execute(message) {

    axios.get ('https://some-random-api.ml/animal/panda')
    .then((res) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Losowe zdjecie pandy')
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