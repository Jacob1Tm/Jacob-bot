const voice = require('@discordjs/voice');
const {Message, MessageEmbed} = require("discord.js");
const userModel = require("../../modele/userSchema");
module.exports = {
    name: 'queue',
    description: 'Wyświetla kolejkę piosenek.',
    cooldown: 5,
    category: 'mus',
    aliases: ["kolejka"],
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
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        guildQueue.songs.map((song, i) => {
            if (i === 0) return message.channel.send({content: `Teraz odtwarzane: **${song.name}**`})
            message.channel.send({content: `**${i}**. **${song.name}**`})
        })
    }}