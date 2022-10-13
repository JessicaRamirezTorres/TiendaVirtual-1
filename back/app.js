const express = require("express");
const app = express();

app.use(express.json());

//rutas
const productos=require("./routes/products")

//ubicacion primera vista usuario
app.use('/api',productos)

module.exports=app;

