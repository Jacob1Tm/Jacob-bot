const {MessageEmbed} = require("discord.js");
const userModel = require("../../modele/userSchema");
module.exports = {
    name: 'volume',
    description: 'Zmienia głośność odtwarzania.',
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