module.exports = {
    name: 'djrole',
    aliases: ['djrole', 'djrola', 'dj', 'setDjRole'],
    description: 'Ustawia rolę DJ',
    category: 'settings',
    usage: '<@rola>',
    args: true,
    user_permissions: ['MANAGE_GUILD'],
    async execute(message, args, client) {
        const djRole = await message.mentions.roles.first();
        if (!djRole) return message.channel.send("Nie znaleziono takiej roli");
        const guildModel = require("../../modele/guildDjRoleSchema");
        let exguild = await guildModel.findOne({guildID: message.guild.id})
        if (exguild) {
            exguild.djRole = djRole.id
            exguild.save()
            message.channel.send(`Ustawiono rolę DJ na ${djRole}`)
        } else {
            let guild = await guildModel.create({
                guildID: message.guild.id,
                djRoleID: djRole.id
            })
            guild.save()
            message.channel.send(`Ustawiono rolę DJ na ${djRole}`)
        }
    }
}
