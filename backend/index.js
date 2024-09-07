const express = require('express');
const requireDir = require('require-dir');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Allows sending data to the application in Json format
app.use(express.json());
app.use(cors(/* IP */));

app.use('/user', require("./routes/users"));

let port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Servidor funcionando em ' + port);
});