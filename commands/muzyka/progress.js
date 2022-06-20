const {MessageEmbed} = require("discord.js");
const userModel = require("../../modele/userSchema");
module.exports = {
    name: 'progress',
    description: 'Pasek postępu piosenki czy coś XD.',
    cooldown: 5,
    category: 'mus',
    aliases: ['pasek', 'postep'],
    async execute(message, args, client) {
        const guildID = message.guild.id;
        let guildQueue = client.player.getQueue(guildID)
        if(!guildQueue) return message.channel.send({content:'Nie jest odtwarzana żadna piosenka'})
        let queue = client.player.createQueue(guildID);
        const ProgressBar = guildQueue.createProgressBar();
        message.channel.send({content:`Aktualny postęp piosenki **${queue.nowPlaying}**\n${ProgressBar}`})
    },}

