const dns = require("node:dns").promises;
dns.setServers(["1.1.1.1"]);

const mongoose = require('mongoose');
const dotenv = require("dotenv");
const User = require("../model/usermodel");

dotenv.config();

const databaseConnect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected sucessfully ");
    }
    catch (error) {
        console.log(error);

    }


};

module.exports = databaseConnect;
