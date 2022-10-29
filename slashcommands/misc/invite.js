const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Link do bota czy cos.'),
    async execute(interaction, client) {
        const embed = new MessageEmbed()
            .setTitle('Link do bota')
            .setDescription(`Kliknij [tutaj](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=269872375&scope=bot+applications.commands) aby dodać bota`)
            .setColor('RANDOM');
        interaction.reply({embeds: [embed], ephemeral: true});
        },
};
