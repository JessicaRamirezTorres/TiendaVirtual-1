//acá se crea el nuevo objeto del modelo producto
const producto=require("../models/productos")

//metodo para ver la lista de productos
exports.getProducts=async(req, res, next)=>{
   const productos =await producto.find();
   res.status(200).json({
    success:true,
    cantidad:productos.length,
    productos
   }) 
}


//metodo para ver un producto por Id
exports.getProductById=async(req, res, next)=>{
   const product =await producto.findById(req.params.id);
   if (!product){
      return res.status(404).json({
         success:false,
         message:"El Id ingresado no corresponde a un producto existente en la tienda Emplas"
      })
   }
   res.status(200).json({
      success:true,
      message:"El producto existe en la base de datos de la tienda Emplas y contiene la siguiente información: ",
      product
   }) 
}

//metodo para actualizar propducto Update
exports.updateProduct=async(req, res, next)=>{
   let product =await producto.findById(req.params.id);
   if (!product){
      return res.status(404).json({
         success:false,
         message:"El producto que desea actualizar no existe en la  base de datos de la tienda Emplas"
      })
   }
   product =await producto.findByIdAndUpdate(req.params.id, req.body,{
      new:true,
      runValidators:true      
   })
   res.status(200).json({
      success:true,
      message:"El producto fue actualizado correctamente en la base de datos Emplas",
      product
   })
}

//metodo para crear nuevo producto /api/productos
exports.newProduct=async(req, res, next)=>{
   const product=await producto.create(req.body);
   res.status(201).json({
      success:true,
      product
   })
}