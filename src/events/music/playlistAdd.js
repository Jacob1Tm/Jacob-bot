module.exports = {
    name: 'playlistAdd',
    execute(queue, playlist) {
        channel = queue.textChannel
        channel.send({content: `Dodano playlistę: **${playlist.name}** - ${playlist.songs.length} utwory`});
    }
}
