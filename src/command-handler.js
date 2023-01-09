module.exports = (client) => {
    const fs = require('fs');
    const Discord = require('discord.js');
    const config = require('./config.js')
    const { musicCheck, djCheck } = require('./funkcje.js')
    const guildPrefixModel = require('./modele/guildPrefixSchema');
    global.owner = config.ownerID

    client.commands = new Discord.Collection();
    client.cooldowns = new Discord.Collection();

    //szukanie komend
    const commandFolders = fs.readdirSync('./src/commands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${folder}/${file}`);
            client.commands.set(command.name, command);
        }
    }
    //handler
    client.on('messageCreate', async message => {
        //sprawdzamy czy jest prefix dla serwera jeżeli nie to dajemy domyślny
        let prefix;
        if (global.databaseonline) {
            let result = await guildPrefixModel.findOne({guildID: message.guild.id});
            if (result === null) prefix = global.gprefix;
            else prefix = result.prefix;
        }
        else prefix = global.gprefix;
        //Reakcja na @bot
        if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`){
            if (message.guild.me.isCommunicationDisabled() === true) return;
            message.channel.send({ content: `Hej! Mój prefix to ${prefix}`})
        }
        //Sprawdzamy czy wiadomość zaczyna się do prefixu i czy nie jest od bota
        if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) || message.author.bot) return;

        //tu argumenty robione
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        //Sprawdzanie czy komenda/alias istnieje
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        //tu embed do wszystki command.xxx aby nie robić 2137 razy
        const embed = new Discord.MessageEmbed()
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());

        //komenda tylko dla właściciela (id === config.ownerID)
        if (command.ownerOnly) {
            embed.setColor("#ff0000")
            embed.setDescription(':x: Ta komenda jest tylko dla dewelopera bota')
            embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
            if (!global.owner.includes(message.author.id)) return message.channel.send({embeds: [embed]});
        }

        //sprawdzanie czy użytkownik podał argumenty gdy wymagane
        if (command.args && !args.length) {
            let reply = `Nie podałeś żadnych argumentów`;

            //i poprawne użycie jak jest podane
            if (command.usage) {
                reply += `\nPoprawne użycie to: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.reply(reply);
        }

        //sprawdzanie czy user ma permisje do użycia komendy
        if (command.userPermissions && command.userPermissions.length) {
            if (command.category === 'mus') {
                if (!djCheck(message)) return;
            } else if (message.content.includes(" -w") && message.author.id === global.owner && !message.member.permissionsIn(message.channel).has(command.userPermissions) && command.category !== 'moderacja') {
                client.channels.cache.get(config.abusechannel).send(`użytkownik \`${message.author.username}\` (${message.author.id}) wymusił użycie komendy \`${command.name}\` na serwerze \`${message.guild.name}\` (${message.guild.id})`)
            } else if (!message.member.permissionsIn(message.channel).has(command.userPermissions)) {
                embed.setColor("#ff0000")
                embed.setDescription(':x: Nie masz permisji do wykonania tej komendy.')
                return message.channel.send({embeds: [embed]})
            }
        }

        //sprawdzanie czy bot ma permisje do wykonania komendy
        if (command.botPermissions && command.botPermissions.length) {
            if (!message.guild.me.permissionsIn(message.channel).has(command.botPermissions)) {
                embed.setColor("#ff0000")
                embed.setDescription(':x: Niestety, nie posiadam permisji do wykonania tej komendy.')
                return message.channel.send({embeds: [embed]})
            }
        }
        //flaga -h (help)
        if (message.content.toLowerCase().includes(" -h")) {
            if (!command.description) return message.channel.send("Ta komenda nie ma jeszcze helpa/opisu");
            embed.setTitle(`Help komendy ${command.name}`)
            embed.addField("**Opis:**", `${command.description}`)
            if (!command.usage) embed.addField(`**Użycie:**`, prefix + command.name)

            if (command.usage) {
                const uzycie = `${prefix}${command.name} ${command.usage}`
                embed.addField(`**Użycie:**`, uzycie)
            }
            if (command.aliases) {
                const aliasy = command.aliases.join(", ");
                embed.addField("**Aliasy:**", aliasy)
            }
            if (command.userPermissions) {
                const permisje = command.userPermissions = command.userPermissions.join(", ")
                embed.addField("**Wymagane Permisje:**", permisje)
            }
            embed.setColor("YELLOW")
            return message.channel.send({embeds: [embed]});
        }

        //sprawdzamy czy użytkownik może używać komend muzycznych jeżeli `everyoneCanUseMusic` w configu nie
        //wskazuje że każdy może.
        if (command.musicAccessOnly) {
            if (!config.everyoneCanUseMusic) {
                let result = await musicCheck(message);
                if (!result) {
                    embed.setColor("#ff0000")
                    embed.setDescription(':x: Ta komenda jest tylko dla osób z nadanym dostępem do muzyki.')
                    return message.channel.send({embeds: [embed]});
                }
            }
        }

        //tutaj cooldowny
        if (message.author.id !== global.owner) {
            const {cooldowns} = client;

            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 3) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply({content: `Poczekaj ${timeLeft.toFixed(1)} sekund przed ponownym użyciem \`${command.name}\``});
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
        //i tu wykonujemy komendę
        try {
            command.execute(message, args, client);
            message.react('✅');
        } catch (error) {
            message.react('❌');
            console.error(error);
            let {makeID} = require("./funkcje.js");
            let errorid = makeID(10);
            message.channel.send({content: `Wystąpił błąd, kod błędu: \`${errorid}\``});
            client.channels.cache.get(config.errorchannel).send({content: `Wystąpił błąd podczas używania komendy \`${command.name}\`, użył jej użytkownik o ID ${message.author.id} (${message.author.tag}).\nNumer błędu: ${errorid}\nTreść błędu:\n\`\`\`${error}\`\`\``});
            console.log("Kod Błędu: " + errorid);
        }
    })
};
