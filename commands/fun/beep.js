module.exports = {
	name: 'beep',
	description: 'Beep!',
	category: 'fun',
	execute(message) {
		message.channel.send({ content: 'Boop.' });
	},
};
