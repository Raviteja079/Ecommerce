import express from "express";
import {
    deleteUser,
  getSingleUser,
  getUserDetails,
  getUsersList,
  logout,
  registerUser,
  requestPasswordReset,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controller/userController.js";
import { loginUser } from "../controller/userController.js";
import { verifyUserAuth } from "../middleware/userAuth.js";
import { roleBasedAccess } from "../utils/jwtToken.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/password/forgot").post(requestPasswordReset);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").post(verifyUserAuth, getUserDetails);
router.route("/password/update").post(verifyUserAuth, updatePassword);
router.route("/profile/update").post(verifyUserAuth, updateProfile);
router
  .route("/admin/users")
  .get(verifyUserAuth, roleBasedAccess("admin"), getUsersList);
router
  .route("/admin/user/:id")
  .get(verifyUserAuth, roleBasedAccess("admin"), getSingleUser)
  .put(verifyUserAuth, roleBasedAccess("admin"), updateUserRole)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteUser)
export default router;
