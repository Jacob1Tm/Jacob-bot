module.exports = {
    name: 'songAdd',
    execute(queue, song) {
        channel = queue.textChannel
        channel.send({content: `Dodano do kolejki: **${song.name}** - ${song.author}`});
    }
}
