module.exports = {
    name: 'queueEnd',
    execute(queue) {
        channel = queue.textChannel
        channel.send({content: `Koniec kolejki! Uciekam za 30s!`});
        setTimeout(() => {
            channel.send({content: `Nie została dodana żadna piosenka. Wychodzę!`});
        }, 30000);
    }
}
