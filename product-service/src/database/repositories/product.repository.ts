// repositories/product.repository.ts
import { Request } from "express";
import { logError } from "../../utils/errorLogger";
import axios from "axios";
import {
  ICreateProduct,
  IUpdateProduct,
  IProduct,
} from "../../interfaces/product.interface";
import ProductModel from "../models/product.model";

export class ProductRepository {
  private async fetchUserDetails(userId: string): Promise<any> {
    try {
      const response = await axios.get(
        `http://localhost:5000/user-service/api/v1/web/user/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);

      throw new Error("Error fetching user details");
    }
  }

  public async create(
    req: Request,
    createProductDto: ICreateProduct
  ): Promise<IProduct> {
    try {
      // Fetch user details to validate the userId
      const user = await this.fetchUserDetails(createProductDto.userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Create the product
      const createdProduct = await ProductModel.create(createProductDto);
      return createdProduct.toObject();
    } catch (error) {
      logError(error, req, "Repository-createProduct");
      throw error;
    }
  }

  public async findAllByUserId(
    req: Request,
    userId: string
  ): Promise<IProduct[]> {
    try {
      // Fetch user details to validate the userId
      await this.fetchUserDetails(userId);

      // Find all products by userId
      const products = await ProductModel.find({ userId });
      return products.map((product) => product.toObject());
    } catch (error) {
      logError(error, req, "Repository-findProductsByUserId");
      throw error;
    }
  }

  public async findOne(req: Request, id: string): Promise<IProduct> {
    try {
      // Find product by ID
      const product = await ProductModel.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product.toObject();
    } catch (error) {
      logError(error, req, "Repository-findOneProduct");
      throw error;
    }
  }

  public async update(
    req: Request,
    id: string,
    updateProductDto: IUpdateProduct
  ): Promise<IProduct> {
    try {
      // Find product by ID
      const product = await ProductModel.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }

      // Update the product
      Object.assign(product, updateProductDto);
      await product.save();
      return product.toObject();
    } catch (error) {
      logError(error, req, "Repository-updateProduct");
      throw error;
    }
  }

  public async remove(req: Request, id: string): Promise<void> {
    try {
      // Find product by ID
      const product = await ProductModel.findByIdAndDelete(id);
      if (!product) {
        throw new Error("Product not found");
      }
    } catch (error) {
      logError(error, req, "Repository-removeProduct");
      throw error;
    }
  }
}

export default ProductRepository;
