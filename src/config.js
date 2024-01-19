const { config } = require('dotenv'); config();
module.exports = {
	// Use environment variables or hardcode your token here.
	'token': process.env.token || '',
	'clientId': process.env.clientId || '',
	'guildId': process.env.guildId || '',
};
