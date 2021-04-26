//requerimos express y lo ponemos en funcionamiento
const express = require('express');
const app = express();

//definimos nuestro puerto
app.set('port', process.env.PORT || 3000);

//requerimos path
const path = require('path');
//requerimos morgan
const morgan = require('morgan');
//requerimos el modulo de mongoose 'mongodb'
const mongoose = require('mongoose');

//ahora configuramos la conexion a la base de datos
mongoose.connect('mongodb://localhost/crud-mongo')
    .then( db => console.log( 'Base de datos conectada' ) )
    .catch( err => console.log( 'Base de datos NO conectada', err ) );

//motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join( __dirname, 'views') );
app.engine('html', require('ejs').renderFile);

//carpeta y archivos estaticos publicos
app.use(express.static( path.join( __dirname, 'public') ));

//middlewares morgan sirve para imprimir las solicitudes de mis clientes en tiempo real
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//rutas del servidor
app.use( require('./routes/') );

//respuesta 404
app.use( (req, res, next) =>{
    res.status(404).render( '404' );
} );

//ponemos a la escucha de peticiones nuestro servidor
app.listen(app.get('port'), ()=>{
    console.log('El servidor esta a la escucha de peticiones en el puerto: ', app.get('port'));
});

