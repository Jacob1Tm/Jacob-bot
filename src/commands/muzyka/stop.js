module.exports = {
    name: 'stop',
    description: 'Wyrzuca bota z kanału głosowego.',
    cooldown: 5,
    category: 'mus',
    musicAccessOnly: true,
    aliases: ['wyjdz', 'wypierdalaj', 'won','leave','disconnect','syberia','naura'],
    userPermissions: ["MANAGE_MESSAGES"],
    async execute(message, args, client) {
        //reszta od komendy
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!message.member.voice.channel) return message.channel.send({content: `Musisz być na kanale głosowym aby użyć tej komendy`})
        if (!guildQueue) return message.channel.send({content:'Nie możesz wyrzucić bota jak go nie ma na kanale głosowym'})
        guildQueue.stop();
        guildQueue.leave();
        message.channel.send({content: `Bot opuścił kanał`})
    },}

