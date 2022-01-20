require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Todos los endpoints de ususario
app.use(require('./server/routes/usuario'));


//Conexion con bdd
mongoose.connect('mongodb://localhost:27017/coffe', (err, res) => {
    if (err) {
        throw err
    }

    console.log("BAse de datos online");
});


app.listen(3000, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
})