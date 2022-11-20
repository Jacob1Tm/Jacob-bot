module.exports = {
    name: 'channelEmpty',
    execute(queue) {
        console.log("Event Wykonany!")
        channel = queue.textChannel
        channel.send({content: `Nikogo nie było przez 30s. Wychodzę!`});
    }
}
