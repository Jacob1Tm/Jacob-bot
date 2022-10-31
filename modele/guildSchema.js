const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
    guildID: {type: String, require: true, unique: true},
})
const model = mongoose.model('Guild', guildSchema)
module.exports = model
