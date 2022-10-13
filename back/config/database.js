const mongoose=require("mongoose");

//método que conecta bd
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con =>{
        console.log(`La base de datos mongo esta adecuadamente conectada con el servidor: ${con.connection.host}`)
    }).catch(con =>{
        console.log(`La conectividad con la base de datos Emplas fue fallida`)
    })
}

module.exports=connectDatabase;
