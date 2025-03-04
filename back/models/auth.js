//Autenticación de usuarios

const mongoose = require("mongoose")
const validator=require("validator")
const bcrypt =require("bcryptjs")
const jwt= require("jsonwebtoken")
const crypto=require("crypto")

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required: [true, "Por favor ingrese el nombre"],
        maxlength: [120,"El nombre no puede exceder los 120 caracteres"]
    },
    email:{
        type: String,
        required: [true, "Por favor ingrese el correo electrónico"],
        unique:true,
        validate: [validator.isEmail, "por favor ingrese un email válido"]
    },
    password:{
        type:String,
        required: [true, "Por favor registre su contraseña"],
        minlength: [8, "Tu contraseña no puede tener menos de 8 caracteres"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            require:true
        },
        url:{
            type: String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    fechaRegistro:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

    })

//Encriptación de contraseña

usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Decodificar contraseña y comparo
usuarioSchema.methods.compararPass = async function (passDada){
    return await bcrypt.compare(passDada, this.password)
}

//Retornar un JWT token
usuarioSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIEMPO_EXPIRACION
    })
}
//Generar un token para reset de contraseña
usuarioSchema.methods.genResetPasswordToken = function(){
    const resetToken= crypto.randomBytes(20).toString('hex')

    //Hashear y setear resetToken
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    
    //setear tiempo de expiración del token 30 min
    this.resetPasswordExpire=Date.now()+30*60*1000
    return resetToken
}

module.exports = mongoose.model("auth", usuarioSchema)
