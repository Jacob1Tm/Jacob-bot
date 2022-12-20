const { RepeatMode } = require('discord-music-player');
module.exports = {
    name: 'loop',
    description: 'Ustawia zapętlanie piosenki/kolejki.',
    aliases: ['zapętlanie', 'zapętl'],
    category: 'mus',
    musicAccessOnly: true,
    userPermissions: ["MANAGE_MESSAGES"],
    async execute(message, args, client) {
        //reszta od komendy
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!guildQueue) return message.channel.send({content:'musisz pierw dodać piosenkę do kolejki'})
        if (!message.member.voice.channel) return message.channel.send({content: `Musisz być na kanale głosowym aby użyć tej komendy`})
        if(!args[0]) return message.channel.send({content:'Podaj argument **song, queue, off**'})
        if (args[0].toLowerCase() === "song") {
            guildQueue.setRepeatMode(RepeatMode.SONG);
            message.channel.send({content: `Zapętlanie ustawione na **song**`})
        } else if (args[0].toLowerCase() === "queue") {
            guildQueue.setRepeatMode(RepeatMode.QUEUE);
            message.channel.send({content: `Zapętlanie ustawione na **queue**`})
        } else if (args[0].toLowerCase() === "off") {
            guildQueue.setRepeatMode(RepeatMode.DISABLED);
            message.channel.send({content: `Zapętlanie ustawione na **off**`})
        } else {
            message.channel.send({content:'Podaj argument **song, queue, off**'})
        }
    },}
