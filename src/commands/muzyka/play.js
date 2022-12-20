const voice = require('@discordjs/voice');
module.exports = {
    name: 'play',
    description: 'Odtwarza dzwięk z linku lub wyszukuje frazę na youtube.',
    category: 'mus',
    aliases: ["p"],
    usage: '<link/fraza>',
    musicAccessOnly: true,
    args: true,
    async execute(message, args, client) {
        //tu samo play
        const vc = message.member.voice.channel;
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!vc) return message.channel.send({content:`Musisz wejść na kanał głosowy aby odtworzyć muzykę`})
        let queue = client.player.createQueue(guildID);
        queue.textChannel = message.channel;
        try {
            await queue.join(vc)
        } catch(e) {
            return message.channel.send("Nie mogę dołączyć na twój kanał głosowy upewnij się że bot ma uprawnienia aby dołączyć na twój kanał głosowy.");
        }
        let song = await queue.play(args.join(' ')).catch(err => {
            message.channel.send({content: 'Nie mogę znaleźć upewnij się że podałeś prawidłową nazwę lub link.'});
        })
    }}
