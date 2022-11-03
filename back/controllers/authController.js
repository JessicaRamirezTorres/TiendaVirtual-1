const User = require("../models/auth")
const ErrorHandler= require("../utils/errorHandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto =require("crypto")

//Registrar un nuevo usuario /api/usuario/registro

exports.registroUsuario= catchAsyncErrors(async (req, res, next) =>{
    const {nombre, email, password} = req.body;

    const user = await User.create({
        nombre,
        email,
        password,
        avatar:{
            public_id:"ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp",
            url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp=CAU"
        }
    })

    tokenEnviado(user, 201, res)
})

//Iniciar Sesion
exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
    const { email, password} =  req.body;

    //revisar si los campos estan completos
    if (!email || !password){
        return next(new ErrorHandler("Por favor ingrese email & Contraseña", 400))
    }

    //Buscar al usuario en nuestra base de datos
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Email o contraseña invalidos", 401))
    }

    //Comparar contraseñas, verificar si está bien
    const contrasenaOK= await user.compararPass(password);

    if (!contrasenaOK){
        return next(new ErrorHandler("Contraseña invalida",401))
    }

    tokenEnviado(user,200,res)
})

//cerrar sesión
exports.logOut = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token",null, {
        expires:new Date(Date.now()),
        httpOnly:true
    })
        res.status(200).json({
        success: true,
        message: "Sesión cerrada"
    })
})

//metodo de recuperar contraseña
exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
    const user=await User.findOne({email:req.body.email});

    if (!user){
        return next (new ErrorHandler("Usuario no se encuentra registrado", 404))
    }
    const resetToken=user.genResetPasswordToken();

    await user.save({validateBeforeSave:false})

    //Crear una url para el reset de contraseña
    const resetUrl=`${req.protocol}://${req.get("host")}/api/resetPassword/${resetToken}`;

    const mensaje=`Puede restaurar su contraseña usando el siguiente link:  \n\n${resetUrl}\n\n
    
    Si no solicitó este link, por favor comuníquese con el área de soporte. \n\n Att:\Tienda Emplas`
    try{
        await sendEmail({
            email:user.email,
            subject:"Recuperación de contraseña Tienda Emplas",
            mensaje
        })
       res.status(200).json({
        success:true,
        message:`Correo enviado a: ${user.email}`
       }) 
     }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.mensage, 500))
     }
})

//Resetear la contraseña
exports.resetPassword =catchAsyncErrors(async(req, res, next)=>{
    //Hash del token para que coincida con el de la base de datos
    const resetPassword = crypto.createHash("sha256").update(req.params.token).digest("hex")
    //Buscamos al usuario
    const user=await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire:{$gt: Date.now()}//compara si esta vencido el token
    })
    //valida si el usuario esta en BD
    if (!user){
        return next (new ErrorHandler("El token es inválido o ya expiró",400))
    }
    //valida que ingrese contraseña igual en ambos campos
    if (req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Las contraseñas no coinciden",400))
    }
    //cambio de contraseña
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    //Guardo datos
    await user.save();
    tokenEnviado(user, 200, res)
})