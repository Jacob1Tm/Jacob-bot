module.exports = {
    name: 'owner',
    description: 'komenda do testowania czy global.owner działa tak useless',
    cooldown: 0.1,
    execute(message) {
        message.channel.send({content:`${global.owner}`});
    },
};
