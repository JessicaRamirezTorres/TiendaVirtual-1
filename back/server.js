const app=require("./app")
const connectDatabase =require("./config/database");

//Archivo de configuración
const dotenv=require ("dotenv");
dotenv.config({path:'back/config/config.env'})

//configuración de Base de Datos
connectDatabase();

//llamada al puerto
const server = app.listen(process.env.PORT, ()=>{
    console.log(`servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})