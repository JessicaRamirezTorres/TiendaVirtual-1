const express=require("express")
const router=express.Router();

const{getProducts, newProduct}=require("../controllers/productsController")

router.route('/productos').get(getProducts)//establecemos ruta del get
router.route('/producto/nuevo').post(newProduct)//establecemos la ruta del producto nuevo creado

module.exports=router;