const guildModel = require("../../modele/guildDjRoleSchema");
const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const guildPrefixModel = require("../../modele/guildPrefixSchema");
module.exports = {
    name: 'settings',
    aliases: ['ustawienia', 'config'],
    description: 'Ustawienia bota',
    category: 'settings',
    async execute(message, args, client) {
        if (global.databaseonline === false) return message.channel.send({content: 'Baza danych jest wyłączona! Nie można zmieniać ustawień!'});
        const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js")
        const embed = new MessageEmbed()
            .setTitle("Ustawienia")
            .setColor("RANDOM")
            .setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setDescription("Kliknij guzik aby przejść do kategorii")
        if (!message.member.permissionsIn(message.channel).has("MANAGE_GUILD")) {
            let row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('1')
                        .setLabel('Ustawienia użytkownika')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('2')
                        .setLabel('Ustawienia serwera')
                        .setStyle('PRIMARY'),
                );
            const reply = await message.reply({
                embeds: [embed],
                components: [row],
                allowedMentions: {repliedUser: false}
            })
            settingsMenu(reply, message, client)
        } else {
            let row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('1')
                        .setLabel('Ustawienia użytkownika')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('2')
                        .setLabel('Ustawienia serwera')
                        .setStyle('PRIMARY'),
                );
            const reply = await message.channel.send({embeds: [embed], components: [row]})
            settingsMenu(reply, message, client)
        }
        function settingsMenu(reply, message, client) {
            const replyId = reply.id;
            let timeout = setTimeout(() => {
                reply.edit({content: "Czas na reakcję minął", components: [], embeds: []})
            }, 600000)
            client.on("interactionCreate", async interaction => {
                if (!interaction.isButton()) return;
                if (interaction.message.id !== replyId) return;
                if (interaction.user.id !== message.author.id) return interaction.reply({content: "Nie możesz używać tego guzika", ephemeral: true})
                interaction.deferUpdate();
                switch (interaction.customId) {
                    case "1" : {
                        const embed = new MessageEmbed()
                            .setTitle("Ustawienia użytkownika")
                            .setColor("RANDOM")
                            .setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                            .setDescription("Kliknij guzik aby zmienić ustawienia")
                        let row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('3')
                                    .setLabel('Reakcja na wiadomość (W.I.P)')
                                    .setStyle('PRIMARY'),
                                new MessageButton()
                                    .setCustomId('2137')
                                    .setLabel('Wstecz')
                                    .setStyle('DANGER'),
                            );
                        await reply.edit({embeds: [embed], components: [row], allowedMentions: {repliedUser: false}})
                        break;
                    }
                    case "2": {
                        const embed = new MessageEmbed()
                            .setTitle("Ustawienia serwera")
                            .setColor("RANDOM")
                            .setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                            .setDescription("Kliknij guzik aby zmienić ustawienia")
                        let row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('4')
                                    .setLabel('Prefix')
                                    .setStyle('PRIMARY'),
                                new MessageButton()
                                    .setCustomId('5')
                                    .setLabel('DJ Role')
                                    .setStyle('PRIMARY'),
                                new MessageButton()
                                    .setCustomId('2137')
                                    .setLabel('Wstecz')
                                    .setStyle('DANGER'),
                            );
                        await reply.edit({embeds: [embed], components: [row], allowedMentions: {repliedUser: false}})
                        break;
                    }
                    case "3": {
                        const embed = new MessageEmbed()
                            .setDescription("Wyślij wiadomość której treść jest emotką")
                            .setColor("RANDOM")
                            .setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                        await reply.edit({embeds: [embed], components: []})
                        client.on("messageCreate", async newmessage => {
                            if (newmessage.channel.id === interaction.channel.id) {
                                if (!newmessage.author.id === message.author.id) return;
                                clearTimeout(timeout);
                                reply.delete();
                                if (newmessage.author.id === message.author.id) return;
                                return message.channel.send("W.I.P");
                            }
                        })
                        break;
                    }
                    case "4": {
                        const embed = new MessageEmbed()
                            .setDescription("Wpisz prefix")
                            .setColor("RANDOM")
                            .setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                        await reply.edit({embeds: [embed], components: []})
                        client.on("messageCreate", async newmessage => {
                                if (newmessage.channel.id === interaction.channel.id) {
                                    if (!newmessage.author.id === message.author.id) return;
                                    const prefix = newmessage.content;
                                    const guildPrefixModel = require("../../modele/guildPrefixSchema");
                                    let exguild = await guildPrefixModel.findOne({guildID: message.guild.id});
                                    if (exguild) {
                                        exguild.prefix = prefix;
                                        exguild.save();
                                    } else {
                                        let guild = await guildPrefixModel.create({
                                            guildID: message.guild.id,
                                            prefix: args[0]
                                        })
                                        guild.save();
                                        clearTimeout(timeout);
                                        reply.delete();
                                        message.channel.send({content: "Zmieniono prefix na " + prefix});
                                    }
                                }
                            }
                        )
                        break;
                    }
                    case "5": {
                        message.channel.send("Oznacz rolę którą chcesz ustawić jako rolę dj.")
                        client.on("messageCreate", async newmessage => {
                            if (newmessage.author.bot) return;
                            if (newmessage.channel.id === interaction.channel.id) {
                                if (!newmessage.author.id === message.author.id) return;
                                const guildPrefixModel = require("../../modele/guildPrefixSchema");
                                let exguild = await guildPrefixModel.findOne({guildID: message.guild.id});
                                if (exguild) {
                                    exguild.djRole = newmessage.mentions.role.first();
                                    exguild.save();
                                } else {
                                    let guild = await guildModel.create({
                                        guildID: newmessage.guild.id,
                                        djRoleID: newmessage.mentions.roles.first(),
                                    })
                                    guild.save();
                                }
                                clearTimeout(timeout);
                                message.channel.send({content: `Ustawiono rolę dj na ${newmessage.mentions.roles.first()}`})
                            }
                        })
                        break;
                    }
                    case "2137": {
                        const embed = new MessageEmbed()
                            .setTitle("Ustawienia")
                            .setColor("RANDOM")
                            .setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                            .setDescription("Kliknij guzik aby przejść do kategorii")
                        let row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('1')
                                    .setLabel('Ustawienia użytkownika')
                                    .setStyle('PRIMARY'),
                                new MessageButton()
                                    .setCustomId('2')
                                    .setLabel('Ustawienia serwera')
                                    .setStyle('PRIMARY'),
                            );
                        await reply.edit({embeds: [embed], components: [row], allowedMentions: {repliedUser: false}})
                        break;
                    }
                }
            })
        }
    },
};
