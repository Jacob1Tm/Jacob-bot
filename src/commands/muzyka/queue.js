const voice = require('@discordjs/voice');
const { embedFooter } = require("../../funkcje.js");
module.exports = {
    name: 'queue',
    description: 'Wyświetla kolejkę piosenek.',
    cooldown: 5,
    category: 'mus',
    aliases: ["kolejka"],
    args: false,
    async execute(message, args, client) {
        //tu samo play
        const embed = new MessageEmbed;
        embed.setTitle(`Kolejka serwera ${message.guild.name}:`)
        embed.setColor("RANDOM")
        embedFooter(embed, message);
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!guildQueue === undefined) return message.channel.send({content: 'Kolejka jest pusta.'});
        try {
            guildQueue.songs.forEach((song, index) => {
                if (index === 0) return embed.addField(`Teraz odtwarzane:`, `**${song.name}** - ${song.author}`);
                if (index === 24) return embed.addField(`Pozostałe piosenki:`, `**${guildQueue.songs.length - 24}**`);
                if (index > 24) return;
                embed.addField(`Piosenka ${index}`, `**${song.name}** - ${song.author}`);
            })
        } catch(e) {
            return message.channel.send({content: 'Kolejka jest pusta.'})
        }
        message.channel.send({embeds: [embed]})
    }}
