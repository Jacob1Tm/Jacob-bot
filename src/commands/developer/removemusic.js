const userModel = require("../../modele/userSchema");
const guildModel = require("../../modele/guildSchema");

async function userRemove(message, args, id) {
    let exuser = await userModel.findOne({userID: id})
    if (!exuser) return message.channel.send("ten użytkownik nie ma dostępu do modułu muzycznego");
    let user = await userModel.deleteOne({userID: id})
    message.channel.send(`Odebrano dostęp do modułu muzycznego dla id ${id}`)
}
async function guildRemove(message, args, id) {
    let exguild = await guildModel.findOne({guildID: id})
    if (!exguild) return message.channel.send("ten serwer nie ma dostępu do modułu muzycznego");
    let guild = await guildModel.deleteOne({guildID: id})
    message.channel.send(`Odebrano dostęp do modułu muzycznego dla serwera ${id}`)
}
module.exports = {
    name: 'removemusic',
    description: 'Zabiera dostęp do muzyki czy coś',
    category: 'developer',
    ownerOnly: true,
    async execute(message, args, client) {
        if(!message.mentions.users.first() && args[0]) {
            let id = args[0]
            client.users.fetch(id).then(user => {
                userRemove(message, args, id)
            }).catch(err => {
                if (id.length !== 18) return message.channel.send("nieprawidłowe id");
                else guildRemove(message, args, id);
            })
        }else if (message.mentions.users.first()) {
            const id = message.mentions.users.first().id
            userRemove(message, args, id)
        }else{
            message.channel.send("Nie oznaczyłeś użytkownika lub nie podałeś id użytkownika/serwera.")
        }
    },
};
