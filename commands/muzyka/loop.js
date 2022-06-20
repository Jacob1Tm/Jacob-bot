const { RepeatMode } = require('discord-music-player');
const {MessageEmbed} = require("discord.js");
const userModel = require("../../modele/userSchema");
module.exports = {
    name: 'loop',
    description: 'Ustawia zapętlanie piosenki/kolejki.',
    aliases: ['zapętlanie', 'zapętl'],
    cooldown: 5,
    category: 'mus',
    userPermissions: ["MANAGE_MESSAGES"],
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
        let guildQueue = client.player.getQueue(guildID)
        if (!guildQueue) return message.channel.send({content:'musisz pierw dodać piosenkę do kolejki'})
        if(!args[0]) return message.channel.send({content:'Podaj argument **song, queue, off**'})
        if (args[0].toLowerCase() === "song") {
            guildQueue.setRepeatMode(RepeatMode.SONG);
            message.channel.send({content: `Zapętlanie ustawione na **song**`})
        } else if (args[0].toLowerCase() === "queue") {
            guildQueue.setRepeatMode(RepeatMode.QUEUE);
            message.channel.send({content: `Zapętlanie ustawione na **queue**`})
        } else if (args[0].toLowerCase() === "off") {
            guildQueue.setRepeatMode(RepeatMode.DISABLED);
            message.channel.send({content: `Zapętlanie ustawione na **off**`})
        } else {
            message.channel.send({content:'Podaj argument **song, queue, off**'})
        }
    },}
