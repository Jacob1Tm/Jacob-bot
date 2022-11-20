module.exports = {
	name: 'shut',
	description: 'Wyłącza bota',
	category: 'developer',
	ownerOnly: true,
	async execute(message, args, client) {
        await message.channel.send({ content: 'Wyłączanie bota'});
         process.exit()
	},
};