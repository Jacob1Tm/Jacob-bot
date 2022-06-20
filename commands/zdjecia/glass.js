const {MessageAttachment, MessageEmbed} = require("discord.js");

module.exports = {
    name: 'glass',
    description: 'Spraw że osoba oznaczona będzie za szkłem! Nie wiem po co ale tak.',
    category: 'zdj',
    execute(message, client, args) {
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
        if(!message.mentions.users.first() && !args[0]) {
            const link = `https://some-random-api.ml/canvas/glass?avatar=${message.author.displayAvatarURL({format: "png"})}`;
            const zaloncznig = new MessageAttachment(link, "glass.png");
            embed.setTitle(`${message.author.username} utknął za szkłem.`);
            embed.setImage('attachment://glass.png');
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        } else if(message.mentions.users.first()) {
            const user = message.mentions.users.first();
            const username = user.username;
            const link = `https://some-random-api.ml/canvas/glass?avatar=${user.displayAvatarURL({format: "png"})}`;
            const zaloncznig = new MessageAttachment(link, "glass.png");
            embed.setTitle(`${username} utknął za szkłem.`);
            embed.setImage('attachment://glass.png');
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        }
    }}