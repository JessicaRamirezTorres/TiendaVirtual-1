//acá se crea el nuevo objeto del modelo producto
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto=require("../models/productos");
const ErrorHandler = require("../utils/errorHandler");
//llamado del recurso fecth para poder usar require
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url));

//metodo para ver la lista de productos
exports.getProducts=catchAsyncErrors( async(req,res,next) =>{
   const productos= await producto.find();
   if (!productos){
      return next(new ErrorHandler ("El producto que desea ver no existe en la Tienda Emplas", 404))
   }
   res.status(200).json({
    success:true,
    cantidad:productos.length,
    productos
   }) 
})


//metodo para ver un producto por Id
exports.getProductById= catchAsyncErrors( async(req, res, next)=>{
   const product= await producto.findById(req.params.id)

   if (!product){
      return next(new ErrorHandler("Producto no encontrado en la tienda Emplas", 404))
      }
   
   
   res.status(200).json({
      success:true,
      message:"El producto existe en la base de datos de la tienda Emplas y contiene la siguiente información: ",
      product
   }) 
})

//metodo para actualizar propducto Update
exports.updateProduct=catchAsyncErrors( async(req, res, next)=>{
   let product =await producto.findById(req.params.id);
   if (!product){
      return next(new ErrorHandler ("El producto que desea modificar no existe en la Tienda Emplas", 404))
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
})

//metodo para eliminar un nuevo producto
exports.deleteProduct=catchAsyncErrors( async(req, res, next)=>{
   const product =await producto.findById(req.params.id);
   if (!product){
      return next(new ErrorHandler ("El producto que desea eliminar no existe en la Tienda Emplas", 404))
   }
   await product.remove();
   res.status(200).json({
      success:true,
      message:"El producto fue eliminado correctamente de la Tienda Emplas"
   })
})

//metodo para crear nuevo producto /api/productos
exports.newProduct=catchAsyncErrors(  async(req, res, next)=>{
   req.body.user=req.user.id;
   const product=await producto.create(req.body);   
   res.status(201).json({
      success:true,
      product
   })
})

//uso del fetch ver todos los productos
function verProductos(){
   fetch('http://localhost:4000/api/productos')
   .then(res=>res.json())
   .then(res=>console.log(res))
   .catch(err=>console.error(err))
}
//verProductos(); prueba la consulta en la terminal de visual para saber si funciona

//uso del fetch ver los productos por id
function verProductoPorID(id){
   fetch('http://localhost:4000/api/producto/'+id)
   .then(res=>res.json())
   .then(res=>console.log(res))
   .catch(err=>console.error(err))
}

//verProductoPorID('634815dbe19fabc3efb69eb3'); prueba la consulta en la terminal de visual para saber si funciona

