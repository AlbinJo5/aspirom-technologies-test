import { Router } from "express";
import ProductMiddleware from "../middlewares/product.middleware";
import ProductService from "../services/product.service";

const router = Router();
const productMiddleware = new ProductMiddleware();
const productService = new ProductService();

/**
 * @swagger
 * /api/v1/web/product:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product Name"
 *               description:
 *                 type: string
 *                 example: "A description of the product"
 *               price:
 *                 type: number
 *                 example: 99.99
 *               userId:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  productMiddleware.validateCreateProduct.bind(productMiddleware),
  productService.createProduct.bind(productService)
);

/**
 * @swagger
 * /api/v1/web/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve product details by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "product123"
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  productMiddleware.validateProductId.bind(productMiddleware),
  productService.getProductById.bind(productService)
);

/**
 * @swagger
 * /api/v1/web/product/user/{userId}:
 *   get:
 *     summary: Get all products created by a specific user
 *     description: Retrieve all products created by a particular user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: "user123"
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       404:
 *         description: No products found for the specified user
 *       500:
 *         description: Internal server error
 */
router.get(
  "/user/:userId",
  productService.getProductsByUserId.bind(productService)
);

/**
 * @swagger
 * /api/v1/web/product/{id}:
 *   patch:
 *     summary: Update a product
 *     description: Update the details of a product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "product123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product Name"
 *               description:
 *                 type: string
 *                 example: "Updated description of the product"
 *               price:
 *                 type: number
 *                 example: 89.99
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id",
  productMiddleware.validateUpdateProduct.bind(productMiddleware),
  productService.updateProduct.bind(productService)
);

export default router;
