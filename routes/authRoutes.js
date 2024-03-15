import express from "express";
import {
  allUserController,
  deleteController,
  registerController,
  singleUserController,
  updatgeController,
} from "../controller/authController.js";

const router = express.Router();
router.post("/register", registerController);
router.get("/allUser", allUserController);
router.delete("/delete-user/:id", deleteController);
router.get("/single-product/:slug", singleUserController);//singelProduct
router.put("/update/:id",updatgeController)


export default router;
