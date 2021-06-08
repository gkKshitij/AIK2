
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const registerURL = require('./routes/Route')
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
//Connecting Database


app.use(express.json()) //Activates body parser into package
app.use(cors()) //Activating cors
//Every route will go through here first

app.listen(4000, () => console.log("Server is up and running at port 4000"))

mongoose.connect(process.env.DATABASE_ACCESS,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
} ,() => console.log("database connected"))


app.use('/app', registerURL)
