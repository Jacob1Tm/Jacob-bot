const { exec } = require("child_process");
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'shell',
    description: 'wykonuje komendy czy coś',
    cooldown: 0.1,
    ownerOnly: true,
    category: 'developer',
    args: true,
    execute(message, args) {
        const tekst = args.join(' ');
        if (tekst.includes('shut','test')) return message.channel.send("HALO CO TO ZA DZIWNE RZECZY :<<<");
        const { exec } = require("child_process");
        const embed = new MessageEmbed()

        exec(`${tekst}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                embed.setDescription(`**Input:**\n \`\`\`${tekst}\`\`\`\n**Error:**\n\`\`\`${error.message}\`\`\``)
                message.channel.send({embeds:[embed]})
                return;
            }
            if (stderr) {
                embed.setDescription(`**Input:**\n \`\`\`${tekst}\`\`\`\n**Output:**\n\`\`\`${stderr}\`\`\``)
                console.log(`stderr: ${stderr}`);
                message.channel.send({embeds:[embed]})
                return;
            }
            if (!stdout) return message.channel.send("Rel");
            embed.setDescription(`**Input:**\n \`\`\`${tekst}\`\`\`\n**Output:**\n\`\`\`${stdout}\`\`\``)
            console.log(`stdout: ${stdout}`);
            message.channel.send({embeds:[embed]})
        })}};