const express=require("express")
const router=express.Router();

const{getProducts, newProduct, getProductById, updateProduct}=require("../controllers/productsController")

router.route('/productos').get(getProducts);//establecemos ruta del get
router.route('/producto/nuevo').post(newProduct);//establecemos la ruta del producto nuevo creado
router.route('/producto/:id').get(getProductById);//ruta para consultar producto por id
router.route('/producto/:id').put(updateProduct);//ruta para actualizar un producto parcialmente

module.exports=router;