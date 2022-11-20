const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ginvite')
        .setDescription('Generuje link do zaproszenia bota z podanego id!')
        .addStringOption(option => option.setName('id').setDescription('Id bota, którego chcesz zaprosić na serwer.').setRequired(true)),
    async execute(interaction, client) {
        const embed = new MessageEmbed();
        const id = interaction.options.getString('id');
        client.users.fetch(id).then(user => {
            if (!user.bot) {
                embed.setTitle('Podany użytkownik nie jest botem!');
                embed.setColor('RED');
                return interaction.reply({content: 'Podany użytkownik nie jest botem!', ephemeral: true});
            } else {
                embed.setTitle(`Zaproszenie dla bota ${user.username}`);
                embed.setDescription(`Kliknij [tutaj](https://discord.com/oauth2/authorize?client_id=${id}&permissions=269872375&scope=bot+applications.commands) aby dodać bota`);
                embed.setColor('RANDOM');
                return interaction.reply({embeds: [embed], ephemeral: true});
            }
        }).catch(() => {
            embed.setTitle('Podano nieprawidłowe id!');
            embed.setColor('RED');
            return interaction.reply({content: 'Podano nieprawidłowe id!', ephemeral: true});
        });
    },
};
