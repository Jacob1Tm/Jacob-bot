const { SlashCommandBuilder } = require('@discordjs/builders');
const {randomStatus} = require("../../funkcje.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Zmienia status bota.')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Typ statusu')
                .setRequired(false)
                .addChoices(
                    {name: 'Watching', value: 'WATCHING'},
                    {name: 'Playing', value: 'PLAYING'},
                    {name: 'Listening', value: 'LISTENING'},
                    {name: 'Streaming', value: 'STREAMING'},
                    {name: 'None', value: 'NONE'},
                ))
        .addStringOption(option =>
            option.setName('status')
                .setDescription('Rodzaj aktywności')
                .setRequired(false)
                .addChoices(
                    {name: 'Available', value: 'available'},
                    {name: 'Invisible', value: 'invisible'},
                    {name: 'Idle', value: 'idle'},
                    {name: 'Do Not Disturb', value: 'dnd'},
                ))
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Tekst statusu')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('public')
                .setDescription('Czy wiadomość zwrotna ma być wysłana na kanale?'))
        .setDescription('To będzie zmieniać status bota w przyszłości!'),
    async execute(interaction, client) {
        if (interaction.user.id !== global.owner) return;
        const presenceStatuses = ["WATCHING", "PLAYING", "LISTENING", "STREAMING"];
        const statuses = ["available", "invisible", "idle", "dnd"];
        const text = interaction.options.getString('text');
        const type = interaction.options.getString('type');
        const status = interaction.options.getString('status');
        const publicmessage = interaction.options.getBoolean('public');

        //kiedy robisz wszystko na raz
        if(presenceStatuses.includes(type) && statuses.includes(status)) {
            console.log(text);
            if (text == null) {
                interaction.reply({content:"Musisz podać text statusu!", ephemeral: true});
            }
            global.customstatus = true;
            client.user.setActivity(text, {
                type: type,
            });
            client.user.setStatus(status);
            return interaction.reply(`Nowy status: \`${type}: ${text}\` (${status})`);
            //kiedy sam status
        } else if(presenceStatuses.includes(type) && status == null) {
            if (text == null) {
                interaction.reply({content:"Musisz podać text statusu!", ephemeral: true});
            }
            global.customstatus = true;
            client.user.setActivity(text, {
                type: type,
            });
            return interaction.reply(`Nowy status: \`${type}: ${text}\``);
            //tu off
        } else if(type === "NONE") {
            global.customstatus = false;
            randomStatus(client);
            return interaction.reply("Wyłączono customowy status: wracam do normalnego statusu.");
            //a tu sam rodzaj aktywności
        } else if(statuses.includes(status)) {
            if (publicmessage === true) {
                client.user.setStatus(status);
                interaction.reply(`Ustawiono aktywność na \`${status}\``)
             } else {
                client.user.setStatus(status);
              return interaction.reply({content: `Ustawiono aktywność na \`${status}\``, ephemeral: true})
            }
        } else {
            interaction.reply({content:"Musisz podać typ statusu!", ephemeral: true});
        }
    },
};
