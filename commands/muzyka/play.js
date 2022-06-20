const voice = require('@discordjs/voice');
const {Message, MessageEmbed} = require("discord.js");
const userModel = require("../../modele/userSchema");
module.exports = {
    name: 'play',
    description: 'Odtwarza dzwięk z linku lub wyszukuje frazę na youtube.',
    cooldown: 5,
    category: 'mus',
    aliases: ["p"],
    args: true,
    async execute(message, args, client) {
        //tutaj kodzior od blokowania jak się nie jest dodanym do tego
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
        //tu samo play
        const vc = message.member.voice.channel;
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!vc) return message.channel.send({content:`Musisz wejść na kanał głosowy aby odtworzyć muzykę`})
        let queue = client.player.createQueue(guildID);
        try {
            await queue.join(vc)
        } catch(e) {
            return message.channel.send("Nie mogę dołączyć na twój kanał głosowy upewnij się że bot ma uprawnienia aby dołączyć na twój kanał głosowy.");
        }
        let song = await queue.play(args.join(' ')).catch(err => message.channel.send({content: 'Nie mogę znaleźć upewnij się że podałeś prawidłową nazwę lub link.'}))
        if (!queue.songs) return voice.getVoiceConnection(`${guildID}`).disconnect();
        if (song.name === undefined) return;
            message.channel.send({content: `Dodano do kolejki **${song.name}**`})
        .catch(_ => {
            if (!guildQueue) {
                queue.stop();
            }
        });
    }}