const {randomstatus: RandomStatus} = require("./../../funkcje.js");
module.exports = {
    name: 'status',
    aliases: ['s'],
    ownerOnly: true,
    category: 'developer',
    description: 'zmienia status bota',
    execute(message, args, client) {
        const presenceStatuses = ["WATCHING", "PLAYING", "LISTENING", "STREAMING"];
        const statuses = ["available", "invisible", "idle", "dnd"];
        const text = args.slice(2).join(' ');
        if(presenceStatuses.includes(args[0].toUpperCase()) && statuses.includes(args[1].toLowerCase())) {
            global.customstatus = true;
            client.user.setActivity(text, {
                type: args[0].toUpperCase(),
            });
            client.user.setStatus(args[1].toLowerCase());
            message.channel.send(`Nowy status: \`${args[0]}: ${text}\` (${args[1]})`);
        } else if(args[0].toUpperCase() == "NONE") {
            global.customstatus = false;
            RandomStatus(client);
            message.channel.send("Wyłączono customowy status: wracam do normalnego statusu.");
        } else message.channel.send(`Taki typ statusu nie istnieje, jako pierwszy argument podaj ${presenceStatuses.map(i => `\`${i}\``).join(", ")}.`);
    }
    }
