module.exports = {
	name: 'user-info',
	description: 'wyświetla informacje o tobie.',
	category: 'info',
	execute(message) {
		message.channel.send({content:`Twój nick: ${message.author.username}\nTwoje id: ${message.author.id}`});
	},
};
