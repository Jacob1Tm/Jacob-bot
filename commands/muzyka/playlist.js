const userModel = require("../../modele/userSchema");
const {MessageEmbed} = require("discord.js");
const voice = require("@discordjs/voice");
module.exports = {
    name: 'playlist',
    description: 'Wstrzymuje odtwarzanie piosenki.',
    cooldown: 5,
    category: 'mus',
    async execute(message, args, client) {
        //kodzior od sprawdzania czy user może
        if (global.databaseonline === true) {
            const userModel = require("../../modele/userSchema");
            const {MessageEmbed} = require("discord.js");
            const embed = new MessageEmbed()
            embed.setColor("#ff0000")
            embed.setDescription(':x: Ta komenda jest tylko dla osób z nadanym dostępem do muzyki.')
            embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
            let id = message.author.id
            let user = await userModel.findOne({userID: `${id}`})
            if (!user) return message.channel.send({embeds: [embed]})
        }
        //reszta od komendy
        const guildID = message.guild.id;
        let queue = client.player.createQueue(guildID);
        let guildQueue = client.player.getQueue(guildID)
        const vc = message.member.voice.channel;
        if (vc) message.channel.send({content: `Bot teraz będzie dodawał piosenki do kolejki, może to trochę potrwać w zależności od ilości piosenek.`});
        const link = args[0]
        try {
            await queue.join(vc)
        } catch(e) {
            return message.channel.send("Nie mogę dołączyć na twój kanał głosowy upewnij się że bot ma uprawnienia aby dołączyć na twój kanał głosowy.");
        }
        let song = await queue.playlist(link).catch(err => message.channel.send({content: 'Nie mogę znaleźć upewnij się że podałeś prawidłową link do playlisty na youtube lub spotify.'}))
        if (!queue.songs) return voice.getVoiceConnection(`${guildID}`).disconnect();
        if (song.name === undefined) return;
        message.channel.send({content: `Dodano do kolejki ${guildQueue.songs.length} piosenek`})
            .catch(_ => {
                if (!guildQueue) {
                    queue.stop();
                }
            });
    },}

