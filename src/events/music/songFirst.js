module.exports = {
    name: 'songFirst',
    async execute(queue, song) {
        let channel = queue.textChannel;
        channel.send({content: `Teraz odtwarzam: **${song.name}** - ${song.author}`});
    }
}
