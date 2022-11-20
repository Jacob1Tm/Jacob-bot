const {MessageEmbed} = require("discord.js");
const userModel = require("../../modele/userSchema");
module.exports = {
    name: 'unlimitedvolume',
    description: 'Zmienia głośność odtwarzania.',
    cooldown: 5,
    category: 'developer',
    aliases: ["uvolume", "uv"],
    ownerOnly: true,
    async execute(message, args, client) {
        //polecam ostrożnie z tym bo uszy bolą
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!guildQueue) return message.channel.send({content:'Nie możesz zmienic glosnosci bota jak nic nie jest odtwarzane'})
        if (!args[0]) {
            message.channel.send({content: `Aktualna głośność to ${guildQueue.volume}%`})
        } else if (isNaN(args[0])) {
            message.channel.send({content:`${args[0]} nie jest liczbą`})
    } else {
        guildQueue.setVolume(args[0])
        message.channel.send({content:`Głośność została zmieniona na ${guildQueue.volume}%`})
}},}

