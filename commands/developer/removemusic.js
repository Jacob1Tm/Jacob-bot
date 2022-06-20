const model = require('..//../modele//userSchema');
const userModel = require("../../modele/userSchema");
const {MessageEmbed} = require("discord.js")
module.exports = {
    name: 'removemusic',
    description: 'Zabiera dostęp do muzyki czy coś',
    category: 'developer',
    ownerOnly: true,
    async execute(message, args) {
        if(!message.mentions.users.first() && args[0]) {
            let exuser = await userModel.findOne({userID: args[0]})
            if (!exuser) return message.channel.send("ten użytkownik nie ma dostępu do modułu muzycznego");
            let user = await userModel.deleteOne({userID: args[0]})
            message.channel.send(`Odebrano dostęp do modułu muzycznego dla id ${args[0]}`)
        }else if (message.mentions.users.first()) {
            const id = message.mentions.users.first().id
            let exuser = await userModel.findOne({userID: id})
            if (!exuser) return message.channel.send("ten użytkownik nie ma dostępu do modułu muzycznego");
            let user = await userModel.deleteOne({userID: id})
            message.channel.send(`Odebrano dostęp do modułu muzycznego dla id ${id}`)
        }else{
            message.channel.send("Nie oznaczyłeś osoby lub nie podałeś id.")
        }
    },
};