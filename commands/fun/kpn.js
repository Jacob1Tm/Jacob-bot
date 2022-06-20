const {MessageEmbed} = require("discord.js")
module.exports = {
    name: 'kpn',
    description: 'Klasyczne Kamień Papier Nożyce.',
    category: 'fun',
    aliases: 'kamienpapiernozyce',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL())
        let wynik = Math.floor(Math.random() * 3);
        //papier 0
        //kamień 1
        //nożyce 2
        if (!args[0]) return message.channel.send("Wybierz \`papier\` \`kamien\` lub \`nozyce\`");
        else if (args[0].toLowerCase() === "papier") {
            embed.setDescription("Bot wybiera :rock:. Wygrywasz!")
            if (wynik === 1) embed.setDescription("Bot wybiera :rock:. Wygrywasz!"), embed.setColor("GREEN")
            else if (wynik === 2) embed.setDescription(`Bot wybiera :scissors:. Przegrywasz.`), embed.setColor("RED")
            else embed.setDescription(`Bot wybiera :roll_of_paper:. Remis.`), embed.setColor("YELLOW")
            message.channel.send({embeds: [embed]})

        } else if (args[0].toLowerCase() === "kamien") {

            if (wynik === 2) embed.setDescription("Bot wybiera :scissors:. Wygrywasz!"), embed.setColor("GREEN")
            else if (wynik === 0) embed.setDescription(`Bot wybiera :roll_of_paper:. Przegrywasz.`), embed.setColor("RED")
            else embed.setDescription(`Bot wybiera :rock:. Remis.`), embed.setColor("YELLOW")
            message.channel.send({embeds: [embed]})

        } else if (args[0].toLowerCase() === "nozyce") {

            if (wynik === 0) embed.setDescription("Bot wybiera :roll_of_paper:. Wygrywasz!"), embed.setColor("GREEN")
            else if (wynik === 1) embed.setDescription(`Bot wybiera :rock:. Przegrywasz.`), embed.setColor("RED")
            else embed.setDescription(`Bot wybiera :scissors:. Remis.`), embed.setColor("YELLOW")
            message.channel.send({embeds: [embed]})

        }
    },
};
