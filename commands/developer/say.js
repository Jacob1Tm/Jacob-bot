module.exports = {
    name: 'say',
    description: 'mówi botem :dobrymem:',
    cooldown: 0.1,
    ownerOnly: true,
    category: 'developer',
    execute(message, args) {
        const tekst = args.join(' ');
        if (message.content.includes("@here") || message.content.includes("@everyone")) return message.channel.send('halo nie można tak pingować')
        message.channel.send({ content: tekst })
    },
};