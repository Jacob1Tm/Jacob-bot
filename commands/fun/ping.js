module.exports = {
	name: 'ping',
	description: 'Pong!',
	cooldown: 5,
	category: 'fun',
	execute(message) {
		message.channel.send({ content: 'Pong.'});
	},
};
