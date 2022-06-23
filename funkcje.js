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
    randomstatus(client) {
        statuses = [
            `Używany przez ${client.guilds.cache.size} serwerów`,
            `Używany przez ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}  użytkowników`,
            `Prefiks: ${global.prefix}`,
            `Wersja: ${global.v}`,
            `Twórca: ${global.ownertag}`,
        ]
        client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)], { type: "WATCHING" });
    }
}