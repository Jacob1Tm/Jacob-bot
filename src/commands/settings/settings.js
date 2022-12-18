const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
module.exports = {
    name: 'settings',
    aliases: ['ustawienia'],
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
            const replyId = reply.id;
            let timeout = setTimeout(() => {
                reply.edit({content: "Czas na reakcję minął", components: [], embeds: []})
            }, 600000)
            client.on("interactionCreate", async interaction => {
                if (!interaction.isButton()) return;
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
                                message.channel.send("W.I.P")
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
