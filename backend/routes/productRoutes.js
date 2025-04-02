import express from "express"
import { getAllProducts, createProducts, updateProduct, deleteProduct, getSingleProduct} from "../controller/productController.js";
import { verifyUserAuth } from "../middleware/userAuth.js";
import { roleBasedAccess } from "../utils/jwtToken.js";
const router= express.Router();


//Routes
// router.get("/products", getAllProducts)
router.route("/products").get(verifyUserAuth,roleBasedAccess("admin"),getAllProducts).post(verifyUserAuth,createProducts)
router.route("/product/:id").put(verifyUserAuth,roleBasedAccess("admin"),updateProduct).delete(verifyUserAuth,roleBasedAccess("admin"),deleteProduct).get(verifyUserAuth,getSingleProduct)

export default router              