
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('Runs JavaScript code.')
		.addStringOption(option => option.setName('code').setDescription('The code to run.').setRequired(true))
		.addBooleanOption(option => option.setName('silent').setDescription('Whether to reply with the result or not.').setRequired(false)),
	async execute(interaction) {
		if (interaction.user.id !== '302872992097107991') return interaction.reply({ content: 'You are not authorized to use this command.', ephemeral: true });
		const code = interaction.options.getString('code');
		let result;
		try {
			result = await eval(code);
		} catch (error) {
			result = error.toString();
		}
		if (!result) return interaction.reply({ content: 'The result was empty.', ephemeral: true });
		if (result.length > 2000) return interaction.reply({ content: 'The result was too long to send.', ephemeral: true });
		// eslint-disable-next-line no-useless-escape
		if (interaction.options.getBoolean('silent') === false) return await interaction.reply({ content: '\`\`\`\n' + result + '\n\`\`\`', ephemeral: false });
		// eslint-disable-next-line no-useless-escape
		await interaction.reply({ content: '\`\`\`\n' + result + '\n\`\`\`', ephemeral: true });

	},
};
