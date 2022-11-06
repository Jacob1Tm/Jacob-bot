module.exports = {
    name: 'songChanged',
    execute(queue, newSong) {
        channel = queue.textChannel
        channel.send({content: `Teraz odtwarzam: **${newSong.name}** - ${newSong.author}`});
    }
}
