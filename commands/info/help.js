const Discord = require("discord.js")
module.exports = {
    name: 'help',
    description: 'Pokazuje listę komend bota',
    category: 'info',
    cooldown: 5,
    execute(message, args, client) {
        //ale ten help taki nie wiem ale działa to ważne jak ktoś chce to może w pr poprawić
        const catinfo = client.commands.filter(command => command.category === 'info').map(x => `**${x.name}**: ${x.description}`).join("\n")
        const catdev = client.commands.filter(command => command.category === 'developer').map(x => `**${x.name}**: ${x.description}`).join("\n")
        const catmod = client.commands.filter(command => command.category === 'moderacja').map(x => `**${x.name}**: ${x.description}`).join("\n")
        const catfun = client.commands.filter(command => command.category === 'fun').map(x => `**${x.name}**: ${x.description}`).join("\n")
        const catzdj = client.commands.filter(command => command.category === 'zdj').map(x => `**${x.name}**: ${x.description}`).join("\n")
        const catmus = client.commands.filter(command => command.category === 'mus').map(x => `**${x.name}**: ${x.description}`).join("\n")
        const arraymus = client.commands.filter(command => command.category === 'mus')
        const arrayinfo = client.commands.filter(command => command.category === 'info')
        const arraydev = client.commands.filter(command => command.category === 'developer')
        const arraymod = client.commands.filter(command => command.category === 'moderacja')
        const arrayfun = client.commands.filter(command => command.category === 'fun')
        const arrayzdj = client.commands.filter(command => command.category === 'zdj')
        const embed = new Discord.MessageEmbed();
        embed.setFooter(`Komenda wykonana przez ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        embed.setColor('RANDOM')
            switch (args[0]?.toLowerCase()) {
                case 'info':
                    embed.setTitle(`Lista komend w kategorii \`info:\``)
                    embed.setDescription(`${catinfo}`)
                    message.channel.send({embeds: [embed]})
                    break;
                case 'developer':
                    if (message.author.id === global.owner) {
                        embed.setTitle(`Lista komend w kategorii \`developer:\``)
                        embed.setDescription(`${catdev}`)
                        message.channel.send({embeds: [embed]})
                    }
                    break;
                case 'moderacja':
                    embed.setTitle(`Lista komend w kategorii \`moderacja:\``)
                    embed.setDescription(`${catmod}`)
                    message.channel.send({embeds: [embed]})
                    break;
                case 'zabawa' :
                    embed.setTitle(`Lista komend w kategorii \`Zabawa:\``)
                    embed.setDescription(`${catfun}`)
                    message.channel.send({embeds: [embed]})
                    break;
                case 'fun':
                    embed.setTitle(`Lista komend w kategorii \`Zabawa:\``)
                    embed.setDescription(`${catfun}`)
                    message.channel.send({embeds: [embed]})
                    break;
                case 'zdjecia':
                    embed.setTitle(`Lista komend w kategorii \`zdjęcia:\``)
                    embed.setDescription(`${catzdj}`)
                    message.channel.send({embeds: [embed]})
                    break;
                case 'zdjęcia':
                    embed.setTitle(`Lista komend w kategorii \`zdjęcia:\``)
                    embed.setDescription(`${catzdj}`)
                    message.channel.send({embeds: [embed]})
                    break;
                case 'muzyka':
                    embed.setTitle(`Lista komend w kategorii \`Muzyka:\``)
                    embed.setDescription(`${catmus}`)
                    message.channel.send({embeds: [embed]})
                    break;
                default:
                    if (message.author.id === global.owner) {
                        //wie ktoś może jak to podzielić na linijki aby na telefonie to normalnie wyglądało XD
                        embed.setDescription(`Prefix bota: ${global.prefix}\nTwórcą bota jest: ${client.users.cache.get(global.owner).tag}\n\n**Lista kategorii**:\n\`info\` (${arrayinfo.size}): W tej kategorii znajdują się komendy z różnymi informacjami.\n\`moderacja\` (${arraymod.size}): W tej kategorii znajdują się komendy do moderacji.\n\`zabawa\` (${arrayfun.size}): W tej kategorii znajdują się komendy 4Fun.\n\`zdjęcia\` (${arrayzdj.size}): W tej kategorii znajdują się komendy dotyczące zdjęć.\n\`muzyka\` (${arraymus.size}): W tej kategorii znajdują się komendy dotyczące muzyki.\n\`developer\` (${arraydev.size}): W tej kategorii znajdują się komendy developera.`)
                        message.channel.send({embeds: [embed]})
                    } else {
                        embed.setDescription(`Prefix bota: ${global.prefix}\nTwórcą bota jest: ${client.users.cache.get(global.owner).tag}\n\n**Lista kategorii**:\n\`info\` (${arrayinfo.size}): W tej kategorii znajdują się komendy z różnymi informacjami.\n\`moderacja\` (${arraymod.size}): W tej kategorii znajdują się komendy do moderacji.\n\`zabawa\` (${arrayfun.size}): W tej kategorii znajdują się komendy 4Fun.\n\`zdjęcia\` (${arrayzdj.size}): W tej kategorii znajdują się komendy dotyczące zdjęć.\n\`muzyka\` (${arraymus.size}): W tej kategorii znajdują się komendy dotyczące muzyki.\n`)
                        message.channel.send({embeds: [embed]})
                    }
        }}}

