const {MessageEmbed, MessageAttachment} = require("discord.js");
module.exports = {
    name: 'triggered',
    description: 'Spraw że osoba którą oznaczysz będzie zła',
    category: 'zdj',
    aliases: ['wkurw'],
    execute(message, client, args) {
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
        if(!message.mentions.users.first() && !args[0]) {
            const link = `https://some-random-api.ml/canvas/triggered/?avatar=${message.author.displayAvatarURL({format: "png"})}`
            const zaloncznig = new MessageAttachment(link, "triggered.png");
            embed.setTitle(`${message.author.username} się wku\*\*\*\*.`);
            embed.setImage('attachment://triggered.png');
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        } else if(message.mentions.users.first()) {
            const user = message.mentions.users.first();
            const username = user.username;
            const link = `https://some-random-api.ml/canvas/triggered/?avatar=${user.displayAvatarURL({format: "png"})}`
            const zaloncznig = new MessageAttachment(link, "triggered.png");
            embed.setTitle(`${username} się wku\*\*\*\*.`);
            embed.setImage('attachment://triggered.png');
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        }
    }}