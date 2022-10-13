//acá se crea el nuevo producto
const producto=require("../models/productos")

//metodo para ver la lista de productos
exports.getProducts=(req, res, next)=>{
   res.status(200).json({
    success:true,
    message:"En esta ubicación podrá visualizar todos los productos disponibles en su Tienda Emplas"
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