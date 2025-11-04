const express = require('express')


const app = express();

app.get("/", (req, res) => {
    res.send("Hy");
})

app.listen(3000)