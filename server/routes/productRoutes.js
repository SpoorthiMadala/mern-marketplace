import express from "express";
import { addProduct, getAllProducts, getMyProducts, deleteProduct } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/mine", authMiddleware, getMyProducts);
router.post("/", authMiddleware, upload.single("image"), addProduct);
router.delete("/:id", authMiddleware, deleteProduct); // 👈 Delete route

export default router;
