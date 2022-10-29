const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { makeid } = require('../../funkcje.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('password')
        .addIntegerOption(option => option.setName('length').setDescription('Długość hasła').setRequired(true).setMinValue(4).setMaxValue(32))
        .setDescription('Generuje losowe hasło.'),
    async execute(interaction) {
        const length = interaction.options.getInteger('length')
        const embed = new MessageEmbed()
            .setTitle('Wygenerowane hasło')
            .setDescription(makeid(length))
            .setColor('RANDOM');
        interaction.reply({embeds: [embed], ephemeral: true});
    },
};
