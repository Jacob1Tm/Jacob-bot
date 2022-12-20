const guildPrefixModel = require('../../modele/guildPrefixSchema');
module.exports = {
    name: 'prefix',
    description: 'Ustawia prefix dla serwera',
    category: 'settings',
    aliases: ['sp','setprefix','ustawprefix'],
    usage: '<prefix>',
    args: true,
    async execute(message, args, client) {
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
