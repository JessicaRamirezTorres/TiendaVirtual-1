const express=require("express")
const router=express.Router();

const{getProducts, newProduct, getProductById}=require("../controllers/productsController")

router.route('/productos').get(getProducts)//establecemos ruta del get
router.route('/producto/nuevo').post(newProduct)//establecemos la ruta del producto nuevo creado
router.route('/producto/:id').get(getProductById)//ruta para consultar producto por id

module.exports=router;