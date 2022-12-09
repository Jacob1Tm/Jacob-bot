const mongoose = require('mongoose');

const guildPrefixSchema = new mongoose.Schema({
    guildID: String,
    prefix: String
})
const model = mongoose.model('GuildPrefix', guildPrefixSchema)
module.exports = model
