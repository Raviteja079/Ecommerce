import express from "express";
import {
  getAllProducts,
  createProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from "../controller/productController.js";
import { verifyUserAuth } from "../middleware/userAuth.js";
import { roleBasedAccess } from "../utils/jwtToken.js";
const router = express.Router();

//Routes
// router.get("/products", getAllProducts)                 
router
  .route("/products")
  .get(getAllProducts)

  router
  .route("/admin/products")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAllProducts);

router.route("/admin/product/create").post(verifyUserAuth, roleBasedAccess("admin"), createProducts);
router
  .route("admin/product/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);
router.route("/product/:id").get(getSingleProduct);

export default router;
