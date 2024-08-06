import { Request, Response } from "express";
import { ICreateProduct } from "../interfaces/product.interface";
import { logError } from "../utils/errorLogger";
import ProductRepository from "../database/repositories/product.repository";

class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async createProduct(req: Request, res: Response) {
    try {
      const product: ICreateProduct = req.body;
      const newProduct = await this.productRepository.create(req, product);
      res.sendFormatted(newProduct, "Product created successfully", 201);
    } catch (error) {
      await logError(error, req, "Service-createProduct");
      res.status(500).json({ message: "Product creation failed", error });
    }
  }

  public async getProductsByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const products = await this.productRepository.findAllByUserId(
        req,
        userId
      );
      res.sendArrayFormatted(products, "Products retrieved successfully", 200);
    } catch (error) {
      await logError(error, req, "Service-getProductsByUserId");
      res.status(500).json({ message: "Product retrieval failed", error });
    }
  }

  public async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await this.productRepository.findOne(req, id);
      if (!product) {
        res.sendError(null, "Product not found", 404);
        return;
      }
      res.sendFormatted(product, "Product retrieved successfully", 200);
    } catch (error) {
      await logError(error, req, "Service-getProductById");
      res.status(500).json({ message: "Product retrieval failed", error });
    }
  }

  public async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product: ICreateProduct = req.body;
      const updatedProduct = await this.productRepository.update(
        req,
        id,
        product
      );
      if (!updatedProduct) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json({
        data: updatedProduct,
        message: "Product updated successfully",
      });
    } catch (error) {
      await logError(error, req, "Service-updateProduct");
      res.status(500).json({ message: "Product update failed", error });
    }
  }
}

export default ProductService;
