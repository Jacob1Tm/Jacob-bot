module.exports = {
	name: 'serwer',
	description: 'wysyła informacje o tym serwerze',
	execute(message) {
		message.channel.send({content:`Nazwa serwera: ${message.guild.name}\nIlość członków: ${message.guild.memberCount}`});
	},
};
