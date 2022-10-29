const SlashCommandBuilder = require('@discordjs/builders').SlashCommandBuilder;
const MessageEmbed = require('discord.js').MessageEmbed;
module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Wysyła avatar użytkownika.')
    .addUserOption(option => option.setName('user').setDescription('Użytkownik, którego avatar chcesz zobaczyć.')),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.user;
        const embed = new MessageEmbed()
            .setTitle(`Avatar użytkownika ${user.username}`)
            .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            .setColor('RANDOM');
        interaction.reply({embeds: [embed]});
    },
};
