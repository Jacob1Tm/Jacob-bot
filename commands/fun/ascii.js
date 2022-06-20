const figlet = require('figlet')
module.exports = {
    name: 'ascii',
    description: 'robi ascii z tekstu xD',
    category: 'fun',
    args: true,
    usage: "<tekst>",
    execute(message, args) {
        const tekst = args.join('  ').slice(20);
        figlet(tekst, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            message.channel.send({content:'UWAGA! Jeżeli wiadomość jest zbyt długa zepsuje się <:dobrymem:863841530041073684>'})
            message.channel.send({content:`\`\`\`\n${data}\n\`\`\``})
        });
    },
};
