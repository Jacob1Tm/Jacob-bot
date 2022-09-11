const voice = require('@discordjs/voice');
const {Message, MessageEmbed} = require("discord.js");
const userModel = require("../../modele/userSchema");
module.exports = {
    name: 'queue',
    description: 'Wyświetla kolejkę piosenek.',
    cooldown: 5,
    category: 'mus',
    aliases: ["kolejka"],
    args: false,
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
        const embed = new MessageEmbed;
        embed.setTitle(`Kolejka serwera ${message.guild.name}:`)
        embed.setColor("RANDOM")
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!guildQueue === undefined) return message.channel.send({content: 'Kolejka jest pusta.'});
        try {
            guildQueue.songs.forEach((song, index) => {
                if (index === 0) return embed.addField(`Teraz odtwarzane:`, `**${song.name}** - ${song.author}`);
                if (index === 24) return embed.addField(`Pozostałe piosenki:`, `**${guildQueue.songs.length - 24}**`);
                embed.addField(`Piosenka ${index}`, `**${song.name}** - ${song.author}`);
            })
        } catch(e) {
            return message.channel.send({content: 'Kolejka jest pusta.'})
        }
        message.channel.send({embeds: [embed]})
    }}