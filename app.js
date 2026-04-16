const express = require("express");
const app = express();

const databaseConnect = require("./database/dbconnect");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const { adimSeeder } = require("./adimSeeded");
const adimuserRoute = require("./routes/adimuserRoute")
const oderRoute = require("./routes/oderRoute")
const cartRoute = require("./routes/CartRoute")
// const dotenv = require("dotenv");
// const middleware = require("./middleware/isAuthention");
const { Server } = require("socket.io")



cors =  require("cors");

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-frontend.vercel.app"
    ],
    credentials: true
}));

// .env lai use garne
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded());


// Routes
app.use("/api/auth/", authRoute);
app.use("/api/product", productRoute);
app.use("/api/auth/product/", productRoute)
app.use("/api/admin/", adimuserRoute)
app.use("/api/order", oderRoute)
app.use("/api/admin/order", adimuserRoute)
app.use("/api/cart", cartRoute)

adimSeeder();


// Database connect
databaseConnect(process.env.MONGO_URL);

const PORT = process.env.PORT
//listen server 
const server = app.listen(3000, () => {
    console.log(`Server has started at PORT ${PORT} `)
})
const io = new Server(server)

io.on("connection", (socket) => {

    

    socket.on('register', async(data) => {
            // const { username, email, userNumber, password } =data
        // await User.create({
        //     userName: username,
        //     userEmail: email,
        //     userNumber: userNumber,
        //     userPassword: bcrypt.hashSync(password, 10)
        // })
        // socket.emit('response',{massage :"user regiter"})
        // austa space ma gayo 
        io.to(socket.id).emit('response', { massage: "user regiter" })
    })
})

 function getSocketIO(){
    return io
}
module.exports.getSocketIO