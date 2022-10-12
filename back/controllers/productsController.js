exports.getProducts=(req, res, next)=>{
   res.status(200).json({
    success:true,
    message:"En esta ubicación podrá visualizar todos los productos disponibles en su Tienda Emplas"
   }) 
}