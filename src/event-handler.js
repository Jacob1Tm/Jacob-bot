const fs = require('fs');

module.exports = (client) => {

    //szukamy eventy
    const eventDirectories = fs.readdirSync('./src/events');

    for (const folders of eventDirectories) {
        const eventFiles = fs.readdirSync(`./src/events/${folders}`).filter(file => file.endsWith('.js'));
        //no i tu wykonujemy
        if (folders === 'music') {
            for (const file of eventFiles) {
                const event = require(`./events/${folders}/${file}`);
                if (event.once) {
                    client.player.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.player.on(event.name, (...args) => event.execute(...args, client));
                }
            }
        } else {
            for (const file of eventFiles) {
                const event = require(`./events/${folders}/${file}`);
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
            }
        }
    }
}
