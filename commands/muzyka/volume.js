module.exports = {
    name: 'volume',
    description: 'Zmienia głośność odtwarzania.',
    cooldown: 5,
    category: 'mus',
    userPermissions: ["MANAGE_MESSAGES"],
    async execute(message, args, client) {
        //reszta od komendy
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!guildQueue) return message.channel.send({content:'Nie możesz zmienic glosnosci bota jak nic nie jest odtwarzane'})
        if (!message.member.voice.channel) return message.channel.send({content: `Musisz być na kanale głosowym aby użyć tej komendy`})
        if (!args[0]) {
            message.channel.send({content: `Aktualna głośność to ${guildQueue.volume}%`})
        } else if (args[0] < 151 && args[0] > 0) {
            guildQueue.setVolume(args[0])
            message.channel.send({content:`Głośność została zmieniona na ${guildQueue.volume}%`})
        } else if (isNaN(args[0])) {
            message.channel.send({content:`${args[0]} nie jest liczbą`})
        } else if (args[0] > 150) {
            message.channel.send({content: 'Liczba musi być pomiędzy 1 a 150'})
        } else if (args[0] < 1) {
            message.channel.send({content: 'Liczba musi być pomiędzy 1 a 150'})
        }
    },}
