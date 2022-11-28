const {exec} = require("child_process");
module.exports = {
    name: 'update',
    description: 'Aktualizuje Bota',
    category: 'developer',
    ownerOnly: true,
    async execute(message) {
            message.channel.send("Pobrano aktualizacje bot się zresetuje automatycznie.")
            const {exec} = require("child_process");
            exec(`git pull`, (error, stdout, stderr) => {
                console.log(`Aktualizacja bota: ${stdout}`)
                process.exit()
            })
        }
};
