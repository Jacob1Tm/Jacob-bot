const voice = require("@discordjs/voice");
module.exports = {
    name: 'playlist',
    description: 'Wstrzymuje odtwarzanie piosenki.',
    cooldown: 5,
    category: 'mus',
    usage: '<link do playlisty>',
    musicAccessOnly: true,
    async execute(message, args, client) {
        //reszta od komendy
        const guildID = message.guild.id;
        let queue = client.player.createQueue(guildID);
        queue.textChannel = message.channel;
        let guildQueue = client.player.getQueue(guildID)
        const vc = message.member.voice.channel;
        if (vc) message.channel.send({content: `Bot teraz będzie dodawał piosenki do kolejki, może to trochę potrwać w zależności od ilości piosenek.`});
        const link = args[0]
        try {
            await queue.join(vc)
        } catch(e) {
            return message.channel.send("Nie mogę dołączyć na twój kanał głosowy upewnij się że bot ma uprawnienia aby dołączyć na twój kanał głosowy.");
        }
        let song = await queue.playlist(link).catch(err => {
            message.channel.send({content: 'Nie mogę znaleźć upewnij się że podałeś prawidłową link do playlisty na youtube lub spotify.'})
        })
    },}

