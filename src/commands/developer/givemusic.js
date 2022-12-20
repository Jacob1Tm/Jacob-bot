const userModel = require("../../modele/userSchema");
const guildModel = require("../../modele/guildSchema");
const {MessageEmbed} = require("discord.js")

async function userGive(message, args, id) {
    let exuser = await userModel.findOne({userID: id})
    if (exuser) return message.channel.send("ten użytkownik już ma dostęp do modułu muzycznego");
    let user = await userModel.create({
        userID: args[0]
    })
    user.save()
    message.channel.send(`Nadano dostęp do modułu muzycznego dla id ${id}`)
}
async function guildGive(message, args, id) {
    let exguild = await guildModel.findOne({guildID: id})
    if (exguild) return message.channel.send("ten serwer już ma dostęp do modułu muzycznego");
    let guild = await guildModel.create({
        guildID: args[0]
    })
    guild.save()
    message.channel.send(`Nadano dostęp do modułu muzycznego dla serwera ${id}`)
}

module.exports = {
    name: 'givemusic',
    description: 'Daje dostęp do muzyki czy coś',
    category: 'developer',
    ownerOnly: true,
    execute(message, args, client) {
        if(!message.mentions.users.first() && args[0]) {
            let id = args[0]
            client.users.fetch(id).then(user => {
                userGive(message, args, id)
            }).catch(err => {
                if (id.length !== 18) return message.channel.send("nieprawidłowe id");
                else guildGive(message, args, id);
            })
        }else if (message.mentions.users.first()) {
            const id = message.mentions.users.first().id
            userGive(message, args, id)
        }else{
            message.channel.send("Nie oznaczyłeś użytkownika lub nie podałeś id użytkownika/serwera.")
        }
    },
};
