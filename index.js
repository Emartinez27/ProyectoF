const express = require('express');
const { getConnection } = require('./db/db-connect-mongo');
const dotenv = require ('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT

app.use(cors()); // implementacion de cors -> este sirve para que el frontend pueda consumir el backend desde
                // dominios diferentes 

getConnection()

app.set('port', process.env.PORT || 4000);
app.use(express.json()); // Parseo Json

app.use('/usuario', require('./router/usuario'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/inventario', require('./router/inventario'));
app.use('/marca', require('./router/marca'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/login', require('./router/login')); //nueva ruta para el servicio de login

app.listen(port, () => {
    console.log(`API REST Nodejs en el puerto ${port}`)
});