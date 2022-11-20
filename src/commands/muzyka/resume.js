module.exports = {
    name: 'resume',
    description: 'Wznawia odtwarzanie piosenki.',
    cooldown: 5,
    aliases: ['wznow', 'wznów'],
    category: 'mus',
    userPermissions: ["MANAGE_MESSAGES"],
    async execute(message, args, client) {
        //reszta od komendy
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!guildQueue) return message.channel.send({content:'Nie jest odtwarzana żadna piosenka'})
        if (!message.member.voice.channel) return message.channel.send({content: `Musisz być na kanale głosowym aby użyć tej komendy`})
        guildQueue.setPaused(false);
        message.channel.send({content: `Odtwarzanie zostało wznowione`})
    },}

