const {randomStatus} = require("../../funkcje.js");
module.exports = {
    name: 'status',
    aliases: ['s'],
    ownerOnly: true,
    category: 'developer',
    description: 'zmienia status bota',
    execute(message, args, client) {
        //dodałem komentarze bo to trochę confusing dla mnie było XD
        const presenceStatuses = ["WATCHING", "PLAYING", "LISTENING", "STREAMING"];
        const statuses = ["available", "invisible", "idle", "dnd"];
        const text = args.slice(2).join(' ');
        //aby unikać errora gdy brakuje argumentu no i aby informować co nie tak
        if (!args[0]||!args[1]) return errormessage();
        //tutaj sprawdzanie czy argumenty są poprawne czy coś
        if(presenceStatuses.includes(args[0].toUpperCase()) && statuses.includes(args[1].toLowerCase())) {
            global.customstatus = true;
            client.user.setActivity(text, {
                type: args[0].toUpperCase(),
            });
            client.user.setStatus(args[1].toLowerCase());
            message.channel.send(`Nowy status: \`${args[0]}: ${text}\` (${args[1]})`);
            //wyłączanie
        } else if(args[0].toUpperCase() == "NONE") {
            global.customstatus = false;
            randomStatus(client);
            message.channel.send("Wyłączono customowy status: wracam do normalnego statusu.");
        } else return errormessage();

        //aby nie pisać 2 razy tej długiej wiadomości
        function errormessage() {
            message.channel.send(`Taki typ statusu nie istnieje, jako pierwszy argument podaj ${presenceStatuses.map(i => `\`${i}\``).join(", ")} oraz rodzaj aktywności w drugim argumencie z tej listy ${statuses.map(i => `\`${i}\``).join(", ")}, możesz również użyć \`NONE\` aby wrócić do domyślnych wiadomości.`);
        }
    }
}
