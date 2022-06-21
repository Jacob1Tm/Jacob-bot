const {exec} = require("child_process");
module.exports = {
    name: 'update',
    description: 'Aktualizuje Bota',
    category: 'developer',
    ownerOnly: true,
    async execute(message) {
        //aby uruchomić komendę upewnij się że git nie będzie wymagał logowania oraz czy po wyłączeniu procesu manager
        //taki jak np pm2 uruchomi proces ponownie
        //jeżeli wszystko jest zrobione zmień w off na false lub usuń wraz z ifem i else
        const off = true;
        if (off === true) {
            message.channel.send("Hej ta komenda jest wyłączona w samym pliku po dalsze informacje zajrzyj do \`update.js\`");
            } else {
            message.channel.send("Pobrano aktualizacje bot się zresetuje automatycznie.")
            const {exec} = require("child_process");
            exec(`git pull`, (error, stdout, stderr) => {
                console.log(`Aktualizacja bota: ${stdout}`)
                process.exit()
            })
        }
    }
};