const express = require("express");
const app = express();
const errorMiddleware=require("./middleware/errors")

app.use(express.json());

//rutas
const productos=require("./routes/products")
const usuarios=require("./routes/auth")

//ubicacion de las vistas para el usuario
app.use('/api',productos)
app.use('/api',usuarios)

//MiddleWares para manejar errores
app.use(errorMiddleware)

module.exports=app;


