const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({extended: true, }));

app.use(cors({
    origin: '*',
    methods:["GET, POST"]
}))

const loginRoutes = require('../src/api/endPoints')
const userRoutes = require('../src/api/userendPoints')

app.use("/api/listuser", userRoutes)
app.use("/api/login", loginRoutes)


app.listen(PORT,()=>{
    console.log(`Server On by port ${PORT}`)
})

