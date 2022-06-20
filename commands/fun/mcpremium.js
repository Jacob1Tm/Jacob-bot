const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'mcpremium',
    description: 'Pokazuje profil podanego nicku w mc',
    category: 'fun',
    args: true,
    usage: "<nick>",
    execute(message, args) {
        //if (message.author.id != global.owner) return message.channel.send("Tak nie potrafię tego poprawić więc aby się nie psuło będzie wyłączone");
        fetch(`https://some-random-api.ml/mc?username=${args[0]}`)
            .then(res => res.json())
            .then(json => {
                const head = `https://crafatar.com/avatars/${json.uuid}`;
                const skin = `https://crafatar.com/renders/body/${json.uuid}`
                //console.log(json.name_history)
                const embed = new Discord.MessageEmbed()
                    .setFooter(`Komenda wykonana przez ${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor("RANDOM")
                    .addFields(
                        { name: 'Nazwa użytkownika', value: `${json.username}`},
                        { name: 'UUID', value: `${json.uuid}`},
                    )
                    //.addField("Historia nicków:" ,json.name_history.map(x => `**${x.name}**: ${x.changedToAt.replace("Original Name", "pierwszy nick gracza")}`))
                    .setThumbnail(head)
                    .setImage(skin);
                console.log(json.uuid)
                if(json.uuid === "undefined") return message.channel.send("Nie znaleziono konta o takiej nazwie.");
                message.channel.send({embeds: [embed]})
            });}
}
