const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'nowplaying',
    description: 'Wyświetla aktualnie odtwarzaną piosenkę.',
    category: 'mus',
    aliases: ['teraz','now'],
    async execute(message, args, client) {
        //reszta od komendy
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!guildQueue) return message.channel.send({content:'Nie jest odtwarzana żadna piosenka'})
        if (!message.member.voice.channel) return message.channel.send({content: `Musisz być na kanale głosowym aby użyć tej komendy`})
        message.channel.send({content:`Aktualnie odtwarzane: **${guildQueue.nowPlaying}**`});
    },}

