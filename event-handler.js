const fs = require('fs');

module.exports = (client) => {

    const eventDirectories = fs.readdirSync('./events');

    for (const folders of eventDirectories) {
        const eventFiles = fs.readdirSync(`./events/${folders}`).filter(file => file.endsWith('.js'));
        console.log(eventFiles);
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
