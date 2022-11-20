const {MessageEmbed, MessageAttachment} = require("discord.js");
module.exports = {
    name: 'petpet',
    description: 'Zamkinj oznaczoną osobą za kratami!',
    category: 'zdj',
    aliases: ['zakraty'],
    execute(message, client, args) {
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
        if(!message.mentions.users.first() && !args[0]) {
            const link = `https://some-random-api.ml/premium/petpet?key=aFBrNFdbWApKQtUbITBB0tQUY&avatar=${message.author.displayAvatarURL({format: "png"})}`;
            const zaloncznig = new MessageAttachment(link, "petpet.png");
            embed.setTitle("petpet.");
            embed.setImage("attachment://petpet.png");
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        } else if(message.mentions.users.first()) {
            const user = message.mentions.users.first();
            const link = `https://some-random-api.ml/premium/petpet?key=aFBrNFdbWApKQtUbITBB0tQUY&avatar=${user.displayAvatarURL({format: "png"})}`
            const zaloncznig = new MessageAttachment(link, "petpet.png");
            embed.setTitle(`petpet.`);
            embed.setImage('attachment://petpet.png');
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        }
    }}