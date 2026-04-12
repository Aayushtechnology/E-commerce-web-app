const bcrypt = require("bcryptjs")
const User = require("./model/usermodel");
exports.adimSeeder = async ()=> {

    // check whether adim exist or not
    const isAdimExist=  await User.findOne({ userEmail: "aaysheditor420@gmail.com" });

    // find laie array
    // findbyeId leie single object

    // console.log(isAdimExist);

    if (isAdimExist) {
        console.log("adim already exist");
        return;
    }

     await User.bulk({
        userEmail: "aayshcomeditor420@gmail.",
        userName: "adim",
        userNumber: "9848777040",
        userPassword: bcrypt.hashSync("adim", 10),
        role:"admin"

    })
    console.log("adim created sucessfully");
    adimSeeder()
}