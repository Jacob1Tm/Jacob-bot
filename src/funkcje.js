const userModel = require("./modele/userSchema");
const guildModel = require("./modele/guildSchema");
const config = require("./config.js");

module.exports = {
    sendtochannel(client, channel, message) {
        client.channels.cache.get(`${channel}`).send({content:message})
    },
    randomStatus(client) {
        statuses = [
            `Używany przez ${client.guilds.cache.size} serwerów`,
            `Używany przez ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}  użytkowników`,
            `Prefiks: ${config.prefix}`,
            `Wersja: ${global.v}`,
            `Soon™️ in English (maybe)`,
            `Help translating on crowdin (soon)`
        ]
        client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)], { type: "WATCHING" });
    },
    //kompletnie nie funkcja zajebana z neta
    makeID(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    async musicCheck(message) {
        let result = true;
        if (global.databaseonline === false) return result = true;
        if (global.databaseonline === true) {
            const userModel = require("./modele/userSchema");
            const guildModel = require("./modele/guildSchema");
            let id = message.author.id
            let user = await userModel.findOne({userID: `${id}`})
            let guild = await guildModel.findOne({guildID: `${message.guild.id}`})
            if (!user && !guild) return result = false;
            else if (user) return result = true;
            else if (guild) return result = true;
        }
    },
    embedFooter(embed, message) {
    embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL())
    },
    async djCheck(message) {
        let result = true;
        if (global.databaseonline === false) return result = false;
        if (global.databaseonline === true) {
            const djModel = require("./modele/guildDjRoleSchema");
            let server = await djModel.findOne({guildID: `${message.guild.id}`})
            if (!server) return result = false;
            let djRole = server.djRoleID
            if (message.member.roles.cache.has(djRole)) return result = true;
            else return result = false;
        }
    },
}
