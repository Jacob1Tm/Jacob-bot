const {MessageEmbed} = require("discord.js");
const userModel = require("../../modele/userSchema");
module.exports = {
    name: 'nowplaying',
    description: 'Wyświetla aktualnie odtwarzaną piosenkę.',
    cooldown: 5,
    category: 'mus',
    aliases: ['teraz','now'],
    async execute(message, args, client) {
        //reszta od komendy
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if (!guildQueue) return message.channel.send({content:'Nie jest odtwarzana żadna piosenka'})
        message.channel.send({content:`Aktualnie odtwarzane: **${guildQueue.nowPlaying}**`});
    },}

