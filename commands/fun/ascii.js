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
            if (data.size > 2000) {
                return message.channel.send("Tekst jest za długi, max 2000 znaków.");
            }
            message.channel.send({content:`\`\`\`\n${data}\n\`\`\``})
        });
    },
};
