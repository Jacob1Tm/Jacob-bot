const dotenv = require("dotenv").config();
const launchargs = process.argv.slice(2);
//jeżeli chcesz podawać token i dane do mongo możesz to zrobić tutaj albo w pliku .env
module.exports = {
	"ownerID": "302872992097107991",
	"token": launchargs[0], //process.env.token
	"prefix": "TJ!",
	"clientId": "829697914712096810",
	"mongo": launchargs[1], //process.env.mongo
	"version": "1.2.0",
	"errorchannel": "906550145213145119",
	"abusechannel": "965602437618626582"
	}
