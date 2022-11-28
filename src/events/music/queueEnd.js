module.exports = {
    name: 'queueEnd',
    execute(queue) {
        channel = queue.textChannel
        channel.send({content: `Koniec kolejki! Uciekam za 30s!`});
    }
}
