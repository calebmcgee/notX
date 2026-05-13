require('dotenv').config();
const express = require('express');
const path = require('node:path');

const loginRouter = require("./routes/loginRouter");

const app = express();
const PORT = 3000;

const assetsPath = path.join(__dirname, "/public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "/views"));
app.set("views-engine","ejs");
app.use(express.urlencoded({extended: true}));

app.use("/", loginRouter);

app.listen(PORT, (error) => {
    if(error){
        throw error;
    }
    console.log(`App listening on port ${PORT}.`);
});