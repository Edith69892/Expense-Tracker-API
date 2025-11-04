const mongoose = require('mongoose');
const {app} = require("./app.js")
const dotenv = require("dotenv");


dotenv.config({ path: "./.env" });

;(async ()=> {
    try {
        await mongoose.connect("mongodb+srv://Naruto:123Naruto@cluster0.kktjlvh.mongodb.net/ExpressTracker")

        console.log("Mongo Db connected.");
        
        app.listen(process.env.PORT, () => {
            console.log("server is running on port :", process.env.PORT);
            
        })
        
    } catch (error) {
        console.log("MongoDb connection error :", error)
    }
})()