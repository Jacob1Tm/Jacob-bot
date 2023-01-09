const mongoose = require('mongoose');

const guildDjRoleSchema = new mongoose.Schema({
    guildID: String,
    djRoleID: String
})
const model = mongoose.model('GuildDjRole', guildDjRoleSchema)
module.exports = model
