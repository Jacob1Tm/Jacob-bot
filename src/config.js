const dotenv = require("dotenv").config();
const version = require("../package.json").version;
//Jakby ktos chcial losowy prefix czy cos
//const {makeid} = require("./funkcje.js");
//const prefix = makeid(2);

module.exports = {
	"ownerID": "302872992097107991",
	"token": process.env.token,
	"prefix": "J!", // prefix;
	"clientId": "303050328918458368",
	"guildId": "826740275460046858",
	"mongo": process.env.mongo,
	"version": version,
	"errorchannel": "906550145213145119",
	"abusechannel": "965602437618626582"
	}
