//Autenticación de usuarios

const mongoose = require("mongoose")
const validator=require("validator")
const bcrypt =require("bcryptjs")

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

usuarioSchema.pre("save", async function(next){
    if (!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

module.exports =mongoose.model("auth",usuarioSchema)
