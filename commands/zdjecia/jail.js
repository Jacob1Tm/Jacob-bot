const {MessageEmbed, MessageAttachment} = require("discord.js");
module.exports = {
    name: 'jail',
    description: 'Zamkinj oznaczoną osobą za kratami!',
    category: 'zdj',
    aliases: ['zakraty'],
    execute(message, client, args) {
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
        if(!message.mentions.users.first() && !args[0]) {
            const link = `https://some-random-api.ml/canvas/jail?avatar=${message.author.displayAvatarURL({format: "png"})}`
            const zaloncznig = new MessageAttachment(link, "jail.png");
            embed.setTitle(`${message.author.username} trafił za kraty.`);
            embed.setImage('attachment://jail.png');
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        } else if(message.mentions.users.first()) {
            const user = message.mentions.users.first();
            const username = user.username;
            const link = `https://some-random-api.ml/canvas/jail?avatar=${user.displayAvatarURL({format: "png"})}`
            const zaloncznig = new MessageAttachment(link, "jail.png");
            embed.setTitle(`${username} trafił za kraty.`);
            embed.setImage('attachment://jail.png');
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        }
    }}