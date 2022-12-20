module.exports = {
    name: 'skip',
    description: 'Pomija aktualną piosenkę.',
    cooldown: 5,
    category: 'mus',
    musicAccessOnly: true,
    aliases: ['wypierdalajztym','pomin'],
    userPermissions: ["MANAGE_MESSAGES"],
    async execute(message, args, client) {
        //reszta od komendy
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!guildQueue) return message.channel.send({content:'Nie jest odtwarzana żadna piosenka'})
        if (!message.member.voice.channel) return message.channel.send({content: `Musisz być na kanale głosowym aby użyć tej komendy`})
        guildQueue.skip()
        message.channel.send({content:'Pomyślnie pominięto piosenkę'})
    },}
