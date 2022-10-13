const express=require("express")
const router=express.Router();

const{getProducts, newProduct, getProductById, updateProduct, deleteProduct}=require("../controllers/productsController")

router.route('/productos').get(getProducts);//establecemos ruta del get
router.route('/producto/nuevo').post(newProduct);//establecemos la ruta del producto nuevo creado
router.route('/producto/:id').get(getProductById);//ruta para consultar producto por id
router.route('/producto/:id').put(updateProduct);//ruta para actualizar un producto parcialmente
router.route('/producto/:id').delete(deleteProduct);//ruta para eliminación de un producto por Id


module.exports=router;