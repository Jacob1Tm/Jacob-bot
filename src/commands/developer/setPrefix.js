const guildPrefixModel = require('../../modele/guildPrefixSchema');
module.exports = {
    name: 'setprefix',
    description: 'Ustawia prefix dla serwera',
    category: 'developer',
    ownerOnly: true,
    async execute(message, args, client) {
        if (!args[0]) return message.channel.send("Nie podałeś prefixu");
        const guildPrefixModel = require("../../modele/guildPrefixSchema");
        let exguild = await guildPrefixModel.findOne({guildID: message.guild.id})
        if (exguild) {
            exguild.prefix = args[0]
            exguild.save()
            message.channel.send(`Zmieniono prefix na ${args[0]}`)
        } else {
            let guild = await guildPrefixModel.create({
                guildID: message.guild.id,
                prefix: args[0]
            })
            guild.save()
            message.channel.send(`Ustawiono prefix na ${args[0]}`)
        }
    }
}
