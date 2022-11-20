const {MessageAttachment, MessageEmbed} = require("discord.js");
module.exports = {
    name: 'loli',
	description: 'loli policja :O',
    category: 'zdj',
	async execute(message, client, args) {
        const embed = new MessageEmbed();
        embed.setColor('RANDOM')
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
        if(!message.mentions.users.first()) {
            const link = `https://some-random-api.ml/canvas/lolice/?avatar=${message.author.displayAvatarURL({format: "png"})}`
            const zaloncznig = new MessageAttachment(link, "lolice.png");
            embed.setTitle(`Lolicja.`);
            embed.setImage('attachment://lolice.png');
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        } else {
            const user = message.mentions.users.first();
            const link = `https://some-random-api.ml/canvas/lolice/?avatar=${user.displayAvatarURL({format: "png"})}`
            const zaloncznig = new MessageAttachment(link, "lolice.png");
            embed.setTitle(`Lolicja.`);
            embed.setImage('attachment://lolice.png');
            message.channel.send({embeds: [embed], files: [zaloncznig]});
        }
}}  