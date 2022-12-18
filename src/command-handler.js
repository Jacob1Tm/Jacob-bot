const config = require("./config");
const guildPrefixModel = require("./modele/guildPrefixSchema");
module.exports = (client) => {
    const fs = require('fs');
    const Discord = require('discord.js');
    const config = require('./config.js')
    const ascii = require("ascii-table");
    const { musicCheck, guildPrefixGet } = require('./funkcje.js')
    const guildPrefixModel = require('./modele/guildPrefixSchema');
    global.owner = config.ownerID

    client.commands = new Discord.Collection();
    client.cooldowns = new Discord.Collection();

    const commandFolders = fs.readdirSync('./src/commands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${folder}/${file}`);
            client.commands.set(command.name, command);
        }
    }
    //tabelga
    client.on("ready", async () => {
        const table = new ascii().setHeading("Komenda", "Folder", "Status").setBorder("│", "─");
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith(".js"));

            for (const file of commandFiles) {
                const commandName = require(`./commands/${folder}/${file}`);
                client.commands.set(commandName.name, commandName);
                if (!commandName.name) table.addRow("-", folder, "❌");
                else table.addRow(commandName.name, folder, "✅");
            }
        }
        console.log(table.toString());
    })

    //handler
    client.on('messageCreate', async message => {
        let prefix;
        if (global.databaseonline == true) {
            let result = await guildPrefixModel.findOne({guildID: message.guild.id});
            if (result === null) prefix = global.gprefix;
            else prefix = result.prefix;
        }
        else prefix = global.gprefix;
        if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        const embed = new Discord.MessageEmbed()
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());

        if (command.guildOnly && message.channel.type === 'dm') {
            return message.reply({content: 'Nie mogę wykonać komendy ponieważ ta komenda nie zadziała w prywatnych wiadomościach'});
        }

        if (command.ownerOnly) {
            embed.setColor("#ff0000")
            embed.setDescription(':x: Ta komenda jest tylko dla dewelopera bota')
            embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
            if (!global.owner.includes(message.author.id)) return message.channel.send({embeds: [embed]});
        }

        if (command.args && !args.length) {
            let reply = `Nie podałeś żadnych argumentów`;

            if (command.usage) {
                reply += `\nPoprawne użycie to: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.reply(reply);
        }


        if (command.userPermissions && command.userPermissions.length) {
            if (message.content.includes(" -w") && message.author.id === global.owner && !message.member.permissionsIn(message.channel).has(command.userPermissions)) {
                message.channel.send(`Użycie Komendy zostanie wymuszone a informacja zostanie wysłana na kanał <#${config.abusechannel}>`)
                client.channels.cache.get(config.abusechannel).send(`użytkownik \`${message.author.username}\` (${message.author.id}) wymusił użycie komendy \`${command.name}\` na serwerze \`${message.guild.name}\` (${message.guild.id})`)
            } else if (!message.member.permissionsIn(message.channel).has(command.userPermissions)) {
                embed.setColor("#ff0000")
                embed.setDescription(':x: Nie masz permisji do wykonania tej komendy.')
                return message.channel.send({embeds: [embed]})
            }
        }

        if (command.botPermissions && command.botPermissions.length) {
            if (!message.guild.me.permissionsIn(message.channel).has(command.botPermissions)) {
                embed.setColor("#ff0000")
                embed.setDescription(':x: Niestety, nie posiadam permisji do wykonania tej komendy.')
                return message.channel.send({embeds: [embed]})
            }
        }

        if (message.content.toLowerCase().includes(" -h")) {
            if (!command.description) return message.channel.send("Ta komenda nie ma jeszcze helpa/opisu");
            embed.setTitle(`Help komendy ${command.name} (BETA)`)
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

        try {
            if (message.guild.me.isCommunicationDisabled() === true) return;
            if (command.category === "mus") {
                musicCheck(message).then((result) => {
                    const {MessageEmbed} = require("discord.js");
                    const embed = new MessageEmbed()
                    embed.setColor("#ff0000")
                    embed.setDescription(':x: Ta komenda jest tylko dla osób z nadanym dostępem do muzyki.')
                    embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL());
                    if (result === true) command.execute(message, args, client);
                    if (result === false) message.channel.send({embeds: [embed]});
                })
            } else command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            let {makeid} = require("./funkcje.js");
            let errorid = makeid(10);
            message.channel.send({content: `Wystąpił błąd, kod błędu: \`${errorid}\``});
            client.channels.cache.get(config.errorchannel).send({content: `Wystąpił błąd podczas używania komendy \`${command.name}\`, użył jej użytkownik o ID ${message.author.id} (${message.author.tag}).\nNumer błędu: ${errorid}\nTreść błędu:\n\`\`\`${error}\`\`\``});
            console.log("Kod Błędu: " + errorid);
        }
    });
    client.on('messageCreate', async message => {
        if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`){
            let prefix;
            if (global.databaseonline == true) {
                let result = await guildPrefixModel.findOne({guildID: message.guild.id});
                if (result === null) prefix = global.gprefix;
                else prefix = result.prefix;
            }
            else prefix = global.gprefix;
            if (message.guild.me.isCommunicationDisabled() === true) return;
            message.channel.send({ content: `Hej! Mój prefix to ${prefix}`})
        }})
    }
