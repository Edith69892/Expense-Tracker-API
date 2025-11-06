const express = require('express')
const cookieParser = require('cookie-parser')


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hy");
})

// import routes

const userRoute = require("./src/routes/user.route.js")
const ExpenseRoute = require("./src/routes/expense.route.js")

app.use("/api/v1/users", userRoute)
app.use("/api/v1/expense", ExpenseRoute)

module.exports = {app}