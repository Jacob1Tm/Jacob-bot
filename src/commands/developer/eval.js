const { MessageEmbed } = require("discord.js");
const { makeID } = require('../../funkcje.js')

module.exports = {
    name: 'eval',
    aliases: ['e'],
    ownerOnly: true,
    category: 'developer',
    description: 'wykonuje kod javascript',
    args: true,
    execute(message, args, client) {
        const tekst = args.join(' ')
        const wynik = eval(tekst)
        if(tekst.includes("token")) return message.reply("wykryto zakazane słowo!")
        const embed = new MessageEmbed()
            .setTitle('Eval')
            .addFields(
                { name: 'Input', value: `\`\`\`${tekst}\`\`\``},
                { name: 'Output', value: `\`\`\`${wynik}\`\`\``},
            )
            .setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send({ embeds: [embed]})
    }}
