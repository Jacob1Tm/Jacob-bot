module.exports = {
    name: 'sayid',
    description: 'mówi botem :dobrymem:',
    cooldown: 0.1,
    ownerOnly: true,
    category: 'developer',
    args: true,
    usage: "<id kanału> <tresc wiadomosci>",
    execute(message, args, client) {
        const id = args[0]
        const tekst = args.join(' ');
        const tekstbezid = tekst.slice(id.length)
        if (message.content.includes("@here") || message.content.includes("@everyone")) return message.channel.send('halo nie można tak pingować')
        client.channels.cache.get(id).send(tekstbezid)
    },
};