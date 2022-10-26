const mongoose = require("mongoose")

//esquema de productos
const productosSchema =mongoose.Schema({
    nombre:{
        type:String,
        required:[true, "El nombre del producto es necesario, por favor registra un nombre."],
        trim:true,
        maxLength:[120,"El nombre del producto no debe exceder los 120 caracteres."]
    },
    precio:{
        type:Number,
        required:[true, "por favor registre un precio para este producto"],
        maxLength:[8,"Revise el precio por favor, el valor individual normalmente no excede $99.999.999"],
        default:0.0
    },
    descripcion:{
        type:String,
        required:[true,"Por favor registre una descripción del producto para ser mostrada al cliente"]
    },
    calificacion:{
        type:Number,
        default:0
    },
    imagen:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    categoria:{
        type:String,
        required:[true,"Por favor seleccione la categoría del producto."],
        enum:{
            values:[
                "Accesorios",
                "Ropa",
                "Calzado",
                "Decoracion",
                "Hogar"
            ]
        }
    },
    vendedor:{
        type:String,
        required:[true, "por favor registre el Nombre del proveedor del producto"]
    },
    inventario:{
        type:Number,
        required:[true, "Por favor registre el stock del producto"],
        maxLength:[5,"Verifique por favor, la cantidad máxima del producto no puede exceder los 99.999"],
        default:0
    },
    numCalificaciones:{
        type:Number,
        default:0
    },
    opiniones:[{
        nombreCliente:{
            type:String,
            required:true
        },
        rating:{
            type:String,
            required:true
        },
        comentario:{
            type:String,
            required:true,
        }
    }],
    fechaCreacion:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("productos",productosSchema)