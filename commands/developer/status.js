const {randomstatus} = require("./../../funkcje.js");
module.exports = {
    name: 'status',
    aliases: ['s'],
    ownerOnly: true,
    category: 'developer',
    description: 'zmienia status bota',
    execute(message, args, client) {
        //kiedyś to przerobię na razie niech będzie tak
        const tekst = args.slice(1).join(' ');
        if (args[0] === "PLAYING".toLowerCase()) {
            global.customstatus = true;
            client.user.setActivity(tekst, {
                type: "PLAYING",
            });
        } else if (args[0].toUpperCase() === "WATCHING") {
            global.customstatus = true;
            client.user.setActivity(tekst, {
                type: "WATCHING",
            });
        } else if (args[0].toUpperCase() === "WATCHING") {
            global.customstatus = true;
            client.user.setActivity(tekst, {
                type: "WATCHING",
            });
        } else if (args[0].toUpperCase() === "STREAMING") {
            global.customstatus = true;
            client.user.setActivity(tekst, {
                type: "STREAMING",
            });
        } else if (args[0].toUpperCase() === "LISTENING") {
            global.customstatus = true;
            client.user.setActivity(tekst, {
                type: "LISTENING",
            });
        } else if (args[0].toUpperCase() === "ONLINE") {
            global.customstatus = true;
            client.user.setStatus('available')
        } else if (args[0].toUpperCase() === "DND") {
            global.customstatus = true;
            client.user.setStatus('dnd')
        } else if (args[0].toUpperCase() === "IDLE") {
            global.customstatus = true;
            client.user.setStatus('idle')
        } else if (args[0].toUpperCase() === "INVISIBLE") {
            global.customstatus = true;
            client.user.setStatus('invisible')
        } else if (args[0].toUpperCase() === "NONE") {
            global.customstatus = true;
            randomstatus(client);
        } else (message.channel.send({ content: 'Podaj argument **PLAYING, STREAMING, LISTENING, WATCHING, online, dnd, idle, invisible**'}))
    }
    }
