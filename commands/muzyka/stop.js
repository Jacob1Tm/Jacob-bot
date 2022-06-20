const {MessageEmbed} = require("discord.js");
const userModel = require("../../modele/userSchema");
module.exports = {
    name: 'stop',
    description: 'Wyrzuca bota z kanału głosowego.',
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
        if (!guildQueue) return message.channel.send({content:'Nie możesz wyrzucić bota jak go nie ma na kanale głosowym'})
        guildQueue.stop();
        message.channel.send({content: `Bot opuścił kanał`})
    },}

