const { MessageEmbed, MessageAttachment } = require("discord.js")
module.exports = {
    name: 'gay',
    description: 'TENCZA!!!',
    category: 'zdj',
    async execute(message, client, args) {
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
        if(!message.mentions.users.first() && !args[0]) {
            let link = `https://some-random-api.ml/canvas/gay?avatar=${message.author.displayAvatarURL({format: "png"})}`
            const zaloncznig = new MessageAttachment(link, "gej.png");
            embed.setTitle(`${message.author.username} lubi tęczę.`);
            embed.setImage('attachment://gej.png');
            console.log(embed);
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        } else if(message.mentions.users.first()) {
            const user = message.mentions.users.first();
            const username = user.username;
            const link = `https://some-random-api.ml/canvas/gay?avatar=${user.displayAvatarURL({format: "png"})}`
            embed.setTitle(`${username} lubi tęczę.`);
            const zaloncznig = new MessageAttachment(link, "gej.png");
            embed.setImage('attachment://gej.png');
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        }
    }}