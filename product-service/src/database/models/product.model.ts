import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "../../interfaces/product.interface";

interface IProductModel extends IProduct, Document {
  _id: string;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProductModel>("Product", ProductSchema);
export default ProductModel;
