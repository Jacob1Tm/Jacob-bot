module.exports = {
	name: 'kick',
	description: 'Oznacz użytkownika i go wyrzuć.',
	guildOnly: true,
	//category: 'moderacja',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send({content:`You wanted to kick: ${taggedUser.username}`});
	},
};
