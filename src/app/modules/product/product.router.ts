import { Router } from "express";
import productController from "./product.controller";

const router = Router()


router.post("/",productController.createProduct)

router.get("/",productController.getProducts)
router.get("/:id",productController.getProductById)


const productRouter = router

export default productRouter


