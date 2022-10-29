module.exports = {
    sendmessage(channel, message) {
        channel.send({content:message})
    },
    sendembed(channel) {
        channel.send({embeds: ['embed']})
    },
    sendtochannel(client, channel, message) {
        client.channels.cache.get(`${channel}`).send({content:message})
    },
    randomStatus(client) {
        statuses = [
            `Używany przez ${client.guilds.cache.size} serwerów`,
            `Używany przez ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}  użytkowników`,
            `Prefiks: ${global.prefix}`,
            `Wersja: ${global.v}`,
            //hej wyłączone bo wywala z jakiegoś powodu jak ograne lub ktoś to będzie
            //`Twórca: ${client.users.cache.get(global.owner).tag}`
        ]
        client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)], { type: "WATCHING" });
    },
    //kompletnie nie funkcja zajebana z neta
    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    embedFooter(embed, message) {
    embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL())
    },
}
