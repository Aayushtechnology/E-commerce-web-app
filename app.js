const express = require("express");
const app = express();

const databaseConnect = require("./database/dbconnect");
const authRoute = require("./routes/authRoute");
const productRoute = require ("./routes/productRoute");
const { adimSeeder } = require("./adimSeeded");
const adimuserRoute = require ("./routes/adimuserRoute")
const oderRoute = require ("./routes/oderRoute")
const cartRoute = require("./routes/CartRoute")
// const dotenv = require("dotenv");
// const middleware = require("./middleware/isAuthention");

// .env lai use garne
require("dotenv").config();   

// Middleware
app.use(express.json()); 
app.use(express.urlencoded());


// Routes
app.use("/api/auth/", authRoute);
app.use("/api/admin/product",productRoute);
// app.use("/api/auth/product/",productRoute)
app.use("/api/admin/",adimuserRoute)
app.use("/api/order",oderRoute)
app.use("/api/admin/order", adimuserRoute)
app.use("/api/cart", cartRoute)

adimSeeder();


// Database connect
databaseConnect(process.env.MONGO_URL);


app.listen(process.env.PORT, () => {
    console.log("Server is starting on port number:", process.env.PORT);
});
 