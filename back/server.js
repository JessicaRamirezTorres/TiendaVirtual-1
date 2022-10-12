const app=require("./app");

//Archivo de configuración
const dotenv=require ("dotenv");
dotenv.config({path:'back/config/config.env'})

//llamada al puerto
const server = app.listen(process.env.PORT, ()=>{
    console.log(`servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})